import {Network} from '@capacitor/network'

export const getCurrentNetworkStatus = async () => {
  return await Network.getStatus();
};
