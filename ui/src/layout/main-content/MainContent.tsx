import React, {ReactNode} from 'react';
import {mainContent} from './MainContent.styles'
import {VStack} from '../../../styled-system/jsx'

function MainContent({children}: {children: ReactNode}) {
  return (
    <VStack className={mainContent} justifyContent="center">
      {children}
    </VStack>
  );
}

export default MainContent;
