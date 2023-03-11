import { Box, Flex, Text } from '../primitives'
import { FC } from 'react'
import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'

const LearnHeroSection: FC = () => {
  const { theme } = useTheme()
  const isMobile = useMediaQuery({ query: '(max-width: 968px)' })

  return (
    <Flex
      as="section"
      css={{
        marginBottom: '$4',
        width: '100%',
        borderRadius: '20px',
        backgroundPosition: 'center center',
        backgroundImage: `linear-gradient(109.6deg, rgb(0, 0, 0) 11.2%, $primary13 91.1%), url('/images/heroSectionBanner.png')`,
        '@xs': {
          display: 'block',
        },
        '@bp1000': {
          display: 'flex',
        },
      }}
    >
      <Flex
        direction="column"
        css={{
          flex: 1,
          '@xs': {
            padding: '64px 24px',
          },
          '@lg': {
            padding: '80px 64px',
          },
        }}
      >
         <Flex css={{
        marginTop: '-50px',
        '@xs': {
          margin: '0 auto',
        },
        '@bp1000': {
          margin: 0,
        },
      }}>
        <img src="/images/nft_launchpad.png" />
        <Box css={{ marginTop: '50px'}}>
        <Text
          style={{
            '@initial': 'subtitle2',
            '@lg': 'subtitle1',
          }}
          css={{
            lineHeight: 2,
            width: '100%',
            marginTop: '$3',
            '@lg': {
              width: '100%',
            },
            color: '$whiteA12',
          }}
        >
          Deploy your own NFT collection with NFTEarth’s launchpad. 
          </Text>
          <Box>

     
          <Text
          style={{
            '@initial': 'subtitle2',
            '@lg': 'subtitle1',
          }}
          css={{
            lineHeight: 2,
            marginTop: '150px',
            width: '100%',
            '@lg': {
              width: '100%',
            },
            color: '$whiteA12',
          }}
        >
          Manage
          the collection settings, minting details, metadata, artwork
          generation, and allowlist, all from the NFTEarth Hub. ❤️
        </Text>
        </Box>
        </Box>
      </Flex>
 
  
      </Flex>
      <Box
        css={{
          // backgroundImage: `url(/images/LearnNFT.png)`,
          // backgroundPosition: 'center',
          // backgroundRepeat: 'no-repeat',
          flex: 0.6,
          '@xs': {},
          '@md': {},
        }}
      ></Box>
    </Flex>
  )
}

export default LearnHeroSection
