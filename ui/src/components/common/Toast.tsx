import React from 'react';
import {alertCircleOutline} from 'ionicons/icons'
import {IonToast} from '@ionic/react'

interface ToastProps {
  isOpen: boolean
  message: string
  onDismiss?: () => void
}

function Toast({isOpen, message, onDismiss}: ToastProps) {
  return (
    <IonToast
      isOpen={isOpen}
      message={message}
      onDidDismiss={onDismiss}
      duration={5000}
      icon={alertCircleOutline}
    />
  );
}

export default Toast;
