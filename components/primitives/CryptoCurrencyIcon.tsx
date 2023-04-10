import React, { FC } from 'react'
import { constants } from 'ethers'
import { styled } from '../../stitches.config'
import { StyledComponent } from '@stitches/react/types/styled-component'
import { useReservoirClient } from '@nftearth/reservoir-kit-ui'

type Props = {
  address: string
  chainId?: number
} & Parameters<StyledComponent>['0']

const StyledImg = styled('img', {})

const CryptoCurrencyIcon: FC<Props> = (
  {
    address = constants.AddressZero,
    chainId,
    css,
  }
) => {
  const client = useReservoirClient()
  const chain = client?.chains?.find((chain: any) =>
    chainId !== undefined ? chain.id === chainId : chain.default
  )

  return (
    <StyledImg
      src={`${chain?.baseApiUrl}/redirect/currency/${address}/icon/v1`}
      css={css}
    />
  )
}

export default CryptoCurrencyIcon
