import {IonIcon} from '@ionic/react'
import {imageOutline} from 'ionicons/icons'
import {noImageStyles} from './NoImage.styles'

function NoImage() {
  return (
    <IonIcon icon={imageOutline} className={noImageStyles} />
  );
}

export default NoImage;
