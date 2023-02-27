import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Text, Flex, Box } from 'components/primitives'
import Layout from 'components/Layout'
import { useEffect, useRef } from 'react'
import { useMarketplaceChain, useMounted } from 'hooks'
import { paths } from '@nftearth/reservoir-sdk'
import { useCollections } from '@nftearth/reservoir-kit-ui'
import fetcher from 'utils/fetcher'
import { NORMALIZE_ROYALTIES } from '../_app'
import supportedChains from 'utils/chains'
import { useIntersectionObserver } from 'usehooks-ts'
import { LeaderboardTable } from 'components/leaderboard/LeaderboardTable'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const LeaderboardPage: NextPage<Props> = ({ ssr }) => {
  const isMounted = useMounted()
  const marketplaceChain = useMarketplaceChain()

  let collectionQuery: Parameters<typeof useCollections>['0'] = {
    limit: 12,
    normalizeRoyalties: NORMALIZE_ROYALTIES,
    sortBy: 'allTimeVolume',
  }

  const { data, hasNextPage, fetchNextPage, isFetchingPage, isValidating } =
    useCollections(
      collectionQuery,
      {
        fallbackData: [ssr.exploreCollections[marketplaceChain.id]],
      },
      marketplaceChain.id
    )

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const loadMoreObserver = useIntersectionObserver(loadMoreRef, {})

  useEffect(() => {
    let isVisible = !!loadMoreObserver?.isIntersecting
    if (isVisible) {
      fetchNextPage()
    }
  }, [loadMoreObserver?.isIntersecting, isFetchingPage])

  return (
    <Layout>
      <Box
        css={{
          height: 'calc(100vh - 80px)',
          width: '100vw',
          '@bp800': {
            p: '$6',
          },
        }}
      >
        <Flex
          align="center"
          direction="column"
          css={{
            height: '100%',
            width: '100%',
          }}
        >
          <Flex>
            <Box css={{ width: '100%' }}>
              <Flex css={{ textAlign: 'center', gap: '$4' }}>
                <Text
                  style={{
                    '@initial': 'h3',
                    '@lg': 'h2',
                  }}
                  css={{
                    lineHeight: 1.2,
                    letterSpacing: 2,
                    marginTop: '$2',
                    color: '$primary9',
                    textAlign: 'center',
                  }}
                >
                  Leaderboard 
                </Text>
                <img
                      style={{ width: 75, height: 75, color: 'green' }}
                      src="/icons/activity-icon.svg"
                    />
              </Flex>
              <Box css={{ textAlign: 'center' }}>
                <Text css={{ color: '$primary11', textAlign: 'center' }}>
                  Increase your position on the leaderboard by completing
                  quests!
                </Text>
              </Box>
            </Box>
          </Flex>
          <Flex
            align="center"
            direction="column"
            css={{
              width: '100%',
              marginTop: '100px',
              alignItems: 'center',
            }}
          >
            <LeaderboardTable />
          </Flex>
        </Flex>
      </Box>
    </Layout>
  )
}

type CollectionSchema =
  paths['/collections/v5']['get']['responses']['200']['schema']
type ChainCollections = Record<string, CollectionSchema>

export const getStaticProps: GetStaticProps<{
  ssr: {
    exploreCollections: ChainCollections
  }
}> = async () => {
  let collectionQuery: paths['/collections/v5']['get']['parameters']['query'] =
    {
      sortBy: '1DayVolume',
      normalizeRoyalties: NORMALIZE_ROYALTIES,
      limit: 12,
    }

  const promises: ReturnType<typeof fetcher>[] = []
  supportedChains.forEach((chain) => {
    promises.push(
      fetcher(`${chain.reservoirBaseUrl}/collections/v5`, collectionQuery, {
        headers: {
          'x-api-key': chain.apiKey || '',
        },
      })
    )
  })

  const responses = await Promise.allSettled(promises)
  const collections: ChainCollections = {}
  responses.forEach((response, i) => {
    if (response.status === 'fulfilled') {
      collections[supportedChains[i].id] = response.value.data
    }
  })

  return {
    props: { ssr: { exploreCollections: collections } },
    revalidate: 5,
  }
}

export default LeaderboardPage
