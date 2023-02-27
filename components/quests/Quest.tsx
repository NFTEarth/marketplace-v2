import { Box, Text, Flex } from 'components/primitives'
import Link from 'next/link'
import { QuestContent, QuestFooter, QuestXPButton, QuestJoinButton } from './styled'

type Props = {
  title: string
  description: string
  points: number
  locked: boolean
  link: string
}

export const Quest = ({ title, description, points, locked, link }: Props) => {
  return (
      <Flex
        justify="center"
        css={{ 
          borderRadius: '16px',
          gap: '$1',
          height: '100%',
          padding: '20px 30px',
          border: '2px solid #6BE481',
          background: '$gray1',
        }}
      >
        {
          locked === true ?
          <Box css={{ position: 'relative' }}>
            <Box css={{position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', top: '50%', width: '100%', textAlign: 'center'}}>
              <img src="/images/Lock.png" style={{ margin: 'auto' }} />
              <Text css={{fontWeight: '700', fontSize: '$5'}}>Earn { points } XP to unlock </Text>  
            </Box>
            <Box css={{
              position: 'relative',
              filter: 'blur(9px)',
            }}>
              <Text
                css={{
                  fontWeight: '900',
                  fontSize: '$11',
                }}
                style="subtitle1"
              >
                {title}
              </Text>
              <QuestContent>
                <Text style="subtitle1">{description}</Text>
              </QuestContent>
              <Flex
                justify="between"
                css={{
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}
              >
                <QuestXPButton>{ points } XP</QuestXPButton>
                <QuestJoinButton>
                  <Text css={{
                    color: 'black',
                    fontWeight: '700',
                  }}>
                    Join
                  </Text>
                </QuestJoinButton>
              </Flex>
            </Box>
          </Box>
          : 
          <Box css={{
            position: 'relative',
          }}>
            <Text
              css={{
                fontWeight: '900',
                fontSize: '$11',
              }}
              style="subtitle1"
            >
              {title}
            </Text>
            <QuestContent>
              <Text style="subtitle1">{description}</Text>
            </QuestContent>
              <Flex
                justify="between"
                css={{
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                }}
              >
              <QuestXPButton>{ points } XP</QuestXPButton>
              <QuestJoinButton>
                <Text css={{
                  color: 'black',
                  fontWeight: '700',
                }}>
                  Join
                </Text>
              </QuestJoinButton>
            </Flex>
          </Box>
        }
        </Flex>
  )
}