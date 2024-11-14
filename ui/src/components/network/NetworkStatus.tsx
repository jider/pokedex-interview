import {useNetworkContext} from '../../hooks'
import {Circle} from '../../../styled-system/jsx'

export const NetworkStatus = () => {
  const {isNetworkOnline} = useNetworkContext()

  return (
    <Circle size={2} backgroundColor={isNetworkOnline ? "green" : "red"} />
  )
}

export default NetworkStatus
