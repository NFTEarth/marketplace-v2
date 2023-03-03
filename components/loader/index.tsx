import { Box } from 'components/primitives'
import { useState, useEffect } from 'react'
import { ProgressDiv, Progress } from './styled'

type Props = {
  width: number
  percent: number
}

export const Loader = ({ width, percent }: Props) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    setValue(percent * width)
  }, [])

  return (
    <Box>
      <ProgressDiv css={{ width: `700px` }}>
        <Progress css={{ width: `${value}px` }} />
      </ProgressDiv>
    </Box>
  )
}
