import { FC, ReactNode, useState } from 'react'
import { useTheme } from 'next-themes'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faMapPin, faEdit, faList, faFileImage } from '@fortawesome/free-solid-svg-icons'
import { Text, Flex, Box, Grid } from 'components/primitives'
import Layout from 'components/Layout'
import SettingsContentContainer from "components/mycollections/settings/SettingsContentContainer"
import DetailsSettings from 'components/mycollections/settings/DetailsSettings'
import RoyalitiesSettings from 'components/mycollections/settings/RoyalitiesSettings'
import MintStateSettings from 'components/mycollections/settings/MintStateSettings'
import WhitelistSettings from 'components/mycollections/settings/WhitelistSettings'
import MetadataSettings from 'components/mycollections/settings/MetadataSettings'

const MyCollectionDetailPage = () => {
  const { theme } = useTheme();
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })
  const [activeTab, setActiveTab] = useState<string | null>('details')

  const getCssTab = (tab: string) => ({
    tab: {
      cursor: 'pointer',
      width: '100%',
      padding: '4px 12px',
      color: activeTab === tab ? (theme === 'light' ? '$primary8' : '$primary10') : 'initial',
      borderLeft: `solid 2px ${activeTab === tab ? (theme === 'light' ? '$primary8' : '$primary10') : '$blackA1'}`,
      marginBottom: 20
    },
    text: {
      ml: 12, 
      fontSize: 14,
      fontWeight: 'bold',
      color: activeTab === tab ? (theme === 'light' ? '$primary8' : '$primary10') : 'initial',
    }
  })

  return (
    <Layout>
      <Box
        css={{
          p: 24,
          height: '100%',
          '@bp800': {
            p: '$5',
          },
        }}>
        <Text style='h6' css={{ fontWeight: 'bold' }}>
          Collection Settings
        </Text>
        <Grid css={{ 
          marginTop: 18,
          widht: '100%', 
          '@md': {
            gridTemplateColumns: '3fr 9fr',
          },
          '@lg': {
            gridTemplateColumns: '2fr 10fr',
          },
        }}>
          <Flex 
            direction='column'
            css={{ 
            widht: '100%', 
            display: 'none',
            '@md': {
                display: 'flex'
              },
            }}>
            <Box>
              <Flex 
                align='center'
                onClick={() => setActiveTab('details')}
                css={getCssTab('details').tab}>
                <Box css={{ width: 16 }}>
                  <FontAwesomeIcon icon={faGear} />
                </Box>
                <Text css={getCssTab('details').text}>Details</Text>
              </Flex>
              <Flex 
                align='center'
                onClick={() => setActiveTab('royalities')}
                css={getCssTab('royalities').tab}>
                <Box css={{ width: 16 }}>
                  <FontAwesomeIcon icon={faMapPin} />
                </Box>
                <Text css={getCssTab('royalities').text}>Royalities</Text>
              </Flex>
              <Flex 
                align='center'
                onClick={() => setActiveTab('mintState')}
                css={getCssTab('mintState').tab}>
                <Box css={{ width: 16 }}>
                  <FontAwesomeIcon icon={faEdit} />
                </Box>
                <Text css={getCssTab('mintState').text}>Mint State</Text>
              </Flex>
              <Flex 
                align='center'
                onClick={() => setActiveTab('whitelist')}
                css={getCssTab('whitelist').tab}>
                <Box css={{ width: 16 }}>
                  <FontAwesomeIcon icon={faList} />
                </Box>
                <Text css={getCssTab('whitelist').text}>Whitelist</Text>
              </Flex>
              <Flex 
                align='center'
                onClick={() => setActiveTab('metadata')}
                css={getCssTab('metadata').tab}>
                <Box css={{ width: 16 }}>
                  <FontAwesomeIcon icon={faFileImage} />
                </Box>
                <Text css={getCssTab('metadata').text}>Metadata</Text>
              </Flex>
            </Box>
          </Flex>
          <Box 
            css={{ 
              width: '100%'
            }}>
            <SettingsContentContainer 
              tab='details' 
              activeTab={activeTab}
              icon={faGear} 
              setActiveTab={() => setActiveTab('details')}>
              <DetailsSettings activeTab={activeTab} />
            </SettingsContentContainer>
            <SettingsContentContainer 
              tab='royalities' 
              activeTab={activeTab}
              icon={faMapPin} 
              setActiveTab={() => setActiveTab('royalities')}>
              <RoyalitiesSettings activeTab={activeTab} />
            </SettingsContentContainer>
            <SettingsContentContainer 
              tab='mintState' 
              activeTab={activeTab}
              icon={faEdit} 
              setActiveTab={() => setActiveTab('mintState')}>
              <MintStateSettings activeTab={activeTab} />
            </SettingsContentContainer>
            <SettingsContentContainer 
              tab='whitelist' 
              activeTab={activeTab}
              icon={faList} 
              setActiveTab={() => setActiveTab('whitelist')}>
              <WhitelistSettings activeTab={activeTab} />
            </SettingsContentContainer>
            <SettingsContentContainer 
              tab='metadata' 
              activeTab={activeTab}
              icon={faFileImage} 
              setActiveTab={() => setActiveTab('metadata')}>
              <MetadataSettings activeTab={activeTab} />
            </SettingsContentContainer>
          </Box>
        </Grid>
      </Box>
    </Layout>
  )
}

export default MyCollectionDetailPage
