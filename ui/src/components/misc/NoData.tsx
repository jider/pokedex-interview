import React from 'react';
import {Link} from 'react-router-dom'
import {FullWidthWrapper} from '../../layout'
import {linkStyles} from './NoData.styles'
import {Center, VStack} from '../../../styled-system/jsx'

function NoData() {
  return (
    <FullWidthWrapper>
      <Center>
        <VStack>
          <p>No pokemon data to display</p>
          <Link to='..' className={linkStyles} style={{color: 'whitesmoke'}}> Go back</Link>
        </VStack>
      </Center>
    </FullWidthWrapper>
  )
}

export default NoData;
