import React, {ReactNode} from 'react'
import {containerStyles} from './FullWidthWrapper.styles'
import {VStack} from '../../styled-system/jsx'

function FullWidthWrapper({children}: {children: ReactNode}) {
  return (
    <VStack className={containerStyles}>
      {children}
    </VStack>
  );
}

export default FullWidthWrapper;
