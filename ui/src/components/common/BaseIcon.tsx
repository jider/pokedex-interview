import React from 'react';
import {IonIcon} from '@ionic/react'
import {baseIcon} from '../../styles/recipes'

interface PokedexCardIconProps {
  className?: string
  icon: string
  onClick?: () => void
}

function BaseIcon({className, icon, onClick}: PokedexCardIconProps) {
  return <IonIcon icon={icon} className={className ?? baseIcon()} onClick={onClick} />
}

export default BaseIcon;
