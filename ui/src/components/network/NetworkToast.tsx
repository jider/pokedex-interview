import {IonToast} from '@ionic/react'
import {wifiOutline} from 'ionicons/icons'
import {useEffect, useState} from 'react'
import {useNetworkContext} from '../../hooks'

const DEFAULT_NETWORK_MAP = {
  true: {
    message: 'The App is working in online mode'
  },
  false: {
    message: 'The network was lost. App is working in offline mode'
  }
}

export const NetworkToast = () => {
  const {isNetworkOnline} = useNetworkContext()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [isNetworkOnline]);

  return (
    <IonToast
      isOpen={isOpen}
      message={DEFAULT_NETWORK_MAP[`${isNetworkOnline}`].message}
      onDidDismiss={() => setIsOpen(false)}
      duration={5000}
      icon={wifiOutline}
    />
  )
}

export default NetworkToast
