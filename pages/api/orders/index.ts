import {NextApiRequest, NextApiResponse} from "next";
import db from "lib/db";
import {paths} from "@nftearth/reservoir-sdk";
import fetcher from "../../../utils/fetcher";
import supportedChains from "../../../utils/chains";
import {ethers} from "ethers";

enum OrderType {
  FULL_OPEN,
  PARTIAL_OPEN,
  FULL_RESTRICTED,
  PARTIAL_RESTRICTED,
}
enum ItemType {
  NATIVE,
  ERC20,
  ERC721,
  ERC1155,
  ERC721_WITH_CRITERIA,
  ERC1155_WITH_CRITERIA,
}
type OrderKind = "contract-wide" | "single-token" | "token-list" | "bundle-ask";
type ConsiderationItem = {
  itemType: ItemType;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
  recipient: string;
};
type OfferItem = {
  itemType: ItemType;
  token: string;
  identifierOrCriteria: string;
  startAmount: string;
  endAmount: string;
};
type OrderComponents = {
  kind?: OrderKind;
  offerer: string;
  zone: string;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  orderType: OrderType;
  startTime: number;
  endTime: number;
  zoneHash: string;
  salt: string;
  conduitKey: string;
  counter: string;
  signature?: string;
};
type Order = {
  parameters: OrderComponents
  chainId: number
  signature: string
}

const NFTItem = [ItemType.ERC721, ItemType.ERC1155];
const medianExpReward = 50
const account = db.collection('account')

const handleOrderBook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).send({message: 'Only POST requests allowed'})
    return
  }

  const { parameters, chainId, signature } : Order = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const chain = supportedChains.find(c => c.id === chainId)

  const accountData = await account.findOne({
    wallet: parameters.offerer
  }).catch(() => null);

  const isListing = parameters.kind === 'token-list'
  const nft = isListing ?
    parameters.offer.find(o => NFTItem.includes(o.itemType)) :
    parameters.consideration.find(o => NFTItem.includes(o.itemType))
  const erc20 = isListing ? parameters.consideration.find(o => o.itemType === ItemType.ERC20) :
    parameters.offer.find(o => o.itemType === ItemType.ERC20)
  const period = parameters.endTime - parameters.startTime

  const collectionQuery: paths["/collections/v5"]["get"]["parameters"]["query"] = {
    id: nft?.token,
    includeTopBid: true
  }

  const { data } = await fetcher(`${chain?.reservoirBaseUrl}/orders/asks/v4`, collectionQuery, {
    headers: {
      'x-api-key': chain?.apiKey || '',
    }
  });

  const collections: paths["/collections/v5"]["get"]["responses"]["200"]["schema"]["collections"] = data?.collections || []
  const collection = collections?.[0];

  if (accountData && collection) {
    // TODO: Calculate reward by floor price & increase reward by listing period & double Reward for NFTE Token
    // const value = ethers.utils.parseUnits(erc20?.startAmount || '0', 'wei')
    // const floorValue = ethers.utils.parseEther(`${collection.floorAsk?.price?.amount?.native}`)
    // const diff = value.sub(floorValue)
    // const mid = value.add(floorValue).div(2)
    // const percentDiff = diff.mul(100).div(mid)
    //
    // accountData.exp += (isListing ? percentDiff.mul(medianExpReward).toNumber().toFixed(2) : percentDiff.mul(-medianExpReward).toNumber().toFixed(2))

    await account.updateOne({
      wallet: parameters.offerer
    }, {
      $inc: {
        exp: medianExpReward
      }
    })
  }

  return res.json({
    message: 'Order Accepted'
  })
}

export default handleOrderBook;