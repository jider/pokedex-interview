import {Network} from '@capacitor/network'
import {createContext, type ReactNode, useEffect, useRef, useState} from 'react'

const initialState = {
  isNetworkOnline: true,
}

export const NetworkContext = createContext({...initialState})

export const NetworkContextProvider = ({children}:{children: ReactNode}) => {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
        initialState: Network.getStatus().then(status => status.connected)})
    )

    void Network.addListener(
      'networkStatusChange',
        status => setState(prevState => ({
          ...prevState,
          isNetworkOnline: status.connected
        })),
    );

    return () => {void Network.removeAllListeners() }
  }, []);

  return (
    <NetworkContext.Provider value={state}>
      {children}
    </NetworkContext.Provider>
  )
}
