import {IonProgressBar, useIonRouter} from '@ionic/react'
import {logOutOutline} from 'ionicons/icons'
import type {ReactNode} from 'react'
import {BaseHeader, HeaderIcon} from './index'
import {NetworkStatus} from '../../components/network'
import {useAuthContext, useInvalidateQueries} from '../../hooks'
import {HStack, VStack} from '../../../styled-system/jsx'

interface PageHeaderProps {
  children?: ReactNode
  isLoading?: boolean
  pageTitle?: string
  bottom?: ReactNode
  showBottom?: boolean
}

export const PageHeader = ({bottom, isLoading, children, pageTitle, showBottom = false}: PageHeaderProps) => {
  const {push} = useIonRouter()
  const {logout} = useAuthContext()
  const {invalidate} = useInvalidateQueries()

  const handleLogout = async () => {
    const wasOk = await logout()
    if (wasOk) {
      await invalidate()
      push('/sign-in', 'none', 'replace')
    }
  }

  return (
    <VStack gap={0}>
      <BaseHeader
        left={
          <HStack gap='4'>
            <NetworkStatus/>
            {pageTitle && <strong>{pageTitle}</strong>}
          </HStack>
        }
        right={
          <HStack>
            {children}
            <HeaderIcon icon={logOutOutline} onClick={handleLogout} />
          </HStack>
        }
        bottom={showBottom && bottom}
      />
      {isLoading
        ? <IonProgressBar type="indeterminate" color="tertiary"/>
        : null
      }
    </VStack>
  )
}

export default PageHeader;
