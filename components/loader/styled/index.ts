import { styled } from "@stitches/react";
import { Box } from "components/primitives";


export const ProgressDiv = styled(Box, {
    backgroundColor: 'rgb(233, 233, 233)',
    borderRadius: '1rem'
  })


  export const Progress = styled(Box, {
    backgroundColor: '$primary9',
    height: '40px',
    borderRadius: '1rem',
    transition: '3s ease',
    transitionDelay: '2s'
  })