import { Box, Flex } from 'components/primitives'
import { Dispatch } from 'react'
import { Quest } from './Quest'

type Props = {
  setOpen: Dispatch<React.SetStateAction<boolean>>
  setQuest: Dispatch<React.SetStateAction<number>>
}

export const QuestsGrid = ({ setOpen, setQuest }: Props) => {
  return (
    <Flex
      css={{
        display: 'grid',
        gap: 48,
        '@xs': {
          gridTemplateColumns: 'unset',
        },
        '@md': {
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@xl': {
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
      }}
    >
      <Box>
        <Quest
          title="Retweet a tweet from NFTEarth"
          description="Retweet this Tweet with Hashtag $NFTE and earn XP points now!"
          points={25}
          locked={false}
          link=""
          setOpen={setOpen}
          setQuest={setQuest}
          number={1}
        />
      </Box>
      <Box>
        <Quest
          title="Post proof of Listing in NFTE"
          description="List your item in NFTE and earn your own XP points for the next level!"
          points={25}
          locked={false}
          link=""
          setOpen={setOpen}
          setQuest={setQuest}
          number={2}
        />
      </Box>
      <Box>
        <Quest
          title="Join NFTEarth's Discord Server"
          description="Join NFTEarth's Discord server and say hello! to earn XP points!"
          points={25}
          locked={false}
          link=""
          setOpen={setOpen}
          setQuest={setQuest}
          number={3}
        />
      </Box>
      <Box>
        <Quest
          title="List your NFT on ANY chain"
          description="List at least ANY 1 NFT in ANY currency at ANY price on ANY chain."
          points={25}
          locked={false}
          link=""
          setOpen={setOpen}
          setQuest={setQuest}
          number={4}
        />
      </Box>
      <Box>
        <Quest
          title="Register a username"
          description="Assign a username to your wallet from the Profile Settings page."
          points={25}
          locked={true}
          link=""
          setOpen={setOpen}
          setQuest={setQuest}
          number={5}
        />
      </Box>
      <Box>
        <Quest
          title="Register a username"
          description="Assign a username to your wallet from the Profile Settings page."
          points={25}
          locked={true}
          link=""
          setOpen={setOpen}
          setQuest={setQuest}
          number={6}
        />
      </Box>
    </Flex>
  )
}
