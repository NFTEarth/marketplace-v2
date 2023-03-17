import {ethers} from "ethers";
import {paths} from "@nftearth/reservoir-sdk";
import fetcher from "utils/fetcher";
import supportedChains from "utils/chains";
import db from "lib/db";

let lastUpdate = (new Date()).getTime();
const EXTRA_REWARD_PER_PERIOD=0.00001
const aMonth = 60 * 24 * 30
const chainToNFTE: Record<number, string> = {
  10: '0xc96f4f893286137ac17e07ae7f217ffca5db3ab6',
  42161: '0xb261104a83887ae92392fb5ce5899fcfe5481456'
}

const entry = db.collection('quest_entry')
type Collection = {
  floorAsk: number | undefined
  topBid: number | undefined
  reward: number
}
type CollectionReward = Record<string, Collection | undefined>
const collectionReward: Record<number, CollectionReward | undefined> = {
  10: undefined,
  42161: undefined
}

const fetchCollection =  async (chainId: number, continuation: string | undefined) => {
  const chain = supportedChains.find(c => c.id === chainId)
  const collectionQuery: paths["/collections/v5"]["get"]["parameters"]["query"] = {
    includeTopBid: true,
    sortBy: 'allTimeVolume',
    limit: 20,
    continuation
  }

  const { data } = await fetcher(`${chain?.reservoirBaseUrl}/collections/v5`, collectionQuery, {
    headers: {
      'x-api-key': chain?.apiKey || '',
    }
  })

  return data
}

const getRewardForRank = (rank: number) => {
  if (rank <= 10) {
    return 100
  }

  if (rank <= 50) {
    return 75
  }

  if (rank <= 75) {
    return 50
  }

  if (rank <= 100) {
    return 25
  }

  return 0
}

const fetchCollectionRankReward = async (chainId: number, collectionId: string) => {
  const currentTime = (new Date()).getTime();
  // Fetch Rank Daily
  if (collectionReward[chainId] && (lastUpdate + (1000 * 60 * 24)) > currentTime) {
    return collectionReward[chainId]?.[collectionId.toLowerCase()] || {
      floorAsk: 0,
      topBid: 0,
      reward: 0
    }
  }

  let i = 0
  let continuation: string | undefined = undefined

  collectionReward[chainId] = {}

  while (i < 100) {
    const result: any = await fetchCollection(chainId, continuation)

    result.collections.forEach((collection: any, j: number) => {
      // @ts-ignore
      collectionReward[chainId][collection.id.toLowerCase()] = {
        floorAsk: +collection.floorAsk?.price?.amount?.native,
        topBid: +collection.topBid?.price?.amount?.native,
        reward: getRewardForRank(i + j + 1)
      }
    })

    continuation = result.continuation
    i += 20
  }

  lastUpdate = currentTime

  return collectionReward[chainId]?.[collectionId]
}

type CalculateReward = (
  chainId: number,
  account: string,
  collectionId: string,
  paymentToken: string,
  amount: string,
  period: number,
  isListing: boolean
) => Promise<number>

export const calculateReward: CalculateReward = async (chainId, account, collectionId, paymentToken, amount, period, isListing)  => {
  const isNFTE = paymentToken === chainToNFTE[chainId];
  let value = +ethers.utils.formatEther(amount || '0').toString()

  // Temp Fix
  if (isNFTE) {
    value = value * 0.000032126308
  }

  const questEntry = await entry.findOne({
    wallet: account
  }).catch(() => null) || []

  const collection = await fetchCollectionRankReward(chainId, collectionId)

  let reward = 0

  if (collection) {
    reward = collection.reward
    const topBidValue = +`${collection.topBid}`
    const floorValue = +`${collection.floorAsk}`
    const tokenValue = floorValue || topBidValue || 0
    const percentDiff = (tokenValue - value) / ((tokenValue + value) / 2)

    period = period > aMonth ? aMonth : period
    reward += reward * (period * EXTRA_REWARD_PER_PERIOD)

    if (isListing) {
      reward += (reward * percentDiff)
    } else {
      reward -= (reward * percentDiff)
    }

    if (reward < 0 || value <= 0 || questEntry.length < 7) {
      reward = 0
    }

    console.info(`New Reward`, {
      chainId,
      account,
      tokenValue,
      value,
      percentDiff,
      reward,
      isNFTE,
      isListing
    })
  }

  return reward * (isNFTE ? 2 : 1)
}