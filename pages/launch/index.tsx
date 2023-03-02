import { Text, Flex, Box } from 'components/primitives'
import { useMediaQuery } from 'react-responsive'
import Layout from 'components/Layout'
import { Loader } from 'components/loader'
import { useState, useEffect } from 'react'

const LaunchPadPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [width, setWidth] = useState(20)
  useEffect(() => {
    const id = setInterval(() => setWidth((width) => width + 5), 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Layout>
      <Box
        css={{
          p: 24,
          height: 'calc(100vh - 80px)',
          '@bp800': {
            p: '$6',
          },
        }}
      >
        <Flex 
          align='center'
          justify='center'
          direction='column'
          css={{
            height: '100%',
       
          }}>
                      <Text
            style={{
              '@initial': 'h3',
              '@lg': 'h2',
            }}
            css={{ lineHeight: 1.2, letterSpacing: 2, color: '$gray10', marginBottom: '20px' }}
          >
           Loading...
          </Text>
            <Loader width={width} percent={25}/>
          {/* <Text
            style={{
              '@initial': 'h3',
              '@lg': 'h2',
            }}
            css={{ lineHeight: 1.2, letterSpacing: 2, color: '$gray10' }}
          >
            COMING SOON
          </Text>
          <Text css={{ color: '$gray10' }}>
            This page is under construction
          </Text> */}
        </Flex>
      </Box>
    </Layout>
  )
}

export default LaunchPadPage