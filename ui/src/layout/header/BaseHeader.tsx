import type {ReactNode} from 'react'
import {baseHeaderStyles, bottomHeaderStyles, mainHeaderStyles} from './BaseHeader.styles'
import {Center, HStack, VStack} from '../../../styled-system/jsx'

interface BaseHeaderProps {
  className?: string
  left?: ReactNode
  right?: ReactNode
  bottom?: ReactNode
}

export const BaseHeader = ({className, left, right, bottom}: BaseHeaderProps) => {
  return (
    <VStack className={className ?? baseHeaderStyles()}>
      <HStack className={mainHeaderStyles}>
        <HStack>{left}</HStack>
        <HStack>{right}</HStack>
      </HStack>
      {bottom
        ? <VStack width='100%' className={bottomHeaderStyles}>
            <Center>{bottom}</Center>
          </VStack>
        : null
      }
    </VStack>
  )
}

export default BaseHeader;
