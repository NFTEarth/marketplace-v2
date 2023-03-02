import { Box } from 'components/primitives'
import { useState, useEffect } from 'react'
import { ProgressDiv, Progress } from './styled'

export const Loader = ({ width, percent }) => {
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
