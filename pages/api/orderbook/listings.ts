import {NextApiRequest, NextApiResponse} from "next"
import { Redis } from '@upstash/redis'
import db from "lib/db"
import {calculateReward} from "lib/reward";
import {ConsiderationItem, ItemType, OfferItem, Orders} from "types/nftearth.d"

const redis = Redis.fromEnv()
const NFTItem = [ItemType.ERC721, ItemType.ERC1155, ItemType.ERC721_WITH_CRITERIA, ItemType.ERC1155_WITH_CRITERIA]
const PaymentItem = [ItemType.ERC20, ItemType.NATIVE]
const account = db.collection('account')

const handleOrderbookListings = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = req.headers['x-api-key']
  if (!apiKey || apiKey !== process.env.ORDERBOOK_API_KEY) {
    res.status(405).send({message: 'Invalid api key'})
    return
  }
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed'})
    return
  }

  const { parameters, chainId, criteria, signature } : Orders = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

  const accountData = await account.findOne({
    wallet: parameters.offerer.toLowerCase()
  }).catch(() => null)

  const nft: OfferItem[] = parameters.offer.filter(o => NFTItem.includes(o.itemType))
  const payment: ConsiderationItem[] = parameters.consideration.filter(o => PaymentItem.includes(o.itemType))
  let period = parameters.endTime - parameters.startTime

  if (accountData) {
    const reward = await calculateReward(
      chainId,
      parameters.offerer.toLowerCase(),
      nft[0]?.token,
      payment[0].token.toLowerCase(),
      payment[0]?.startAmount,
      parameters.endTime - parameters.startTime,
      true
    )

    const existingReward = await redis
      .get(`list:${chainId}:${parameters.offerer}:${nft[0]?.token}:${nft[0]?.identifierOrCriteria}`)
      .then((res) => res as number)
      .catch(() => 0)
    const finalReward = reward - existingReward

    await redis.setex(`list:${chainId}:${parameters.offerer}:${nft[0]?.token}:${nft[0]?.identifierOrCriteria}`, period, finalReward)

    await account.updateOne({
      wallet: parameters.offerer.toLowerCase()
    }, {
      $inc: {
        listingExp: finalReward,
        exp: finalReward
      }
    })
  }

  return res.json({
    message: 'Listing Accepted'
  })
}

export default handleOrderbookListings