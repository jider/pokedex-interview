import {IonButton, IonInput, IonRouterLink} from '@ionic/react'
import {KeyboardEvent, useMemo, useState} from 'react'
import {useRouteMatch} from 'react-router'
import {AuthUser} from '../../interfaces'
import {isValidEmail} from '../../utils'
import {formButtonStyles, formLink} from './AuthForm.styles'
import {HStack, VStack} from '../../../styled-system/jsx'

interface CredentialsFormProps {
  onClick: (authUser: AuthUser) => void
}

const LINK_MAP = {
  signIn: {
    actionText: 'Login',
    message: 'Need an account?',
    path: '/sign-up'
  },
  signUp: {
    actionText: 'Create Account',
    message: 'Already a user?',
    path: '/sign-in'
  },
}

const AuthForm = ({onClick}: CredentialsFormProps) => {
  const match = useRouteMatch()
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const isLogin = match.path.includes('sign-in')
  const linkData = isLogin ?  LINK_MAP.signIn : LINK_MAP.signUp
  const isFormValid = useMemo(() => {
    return isValidEmail(formValues.email) && formValues.password.trim().length > 4
  }, [formValues])

  const handleInput = (e: Event) => {
    const {name, value} = e.target as HTMLInputElement
    setFormValues(prev => ({...prev, [name]: value}))
  }

  const handleClick = () => {
    onClick({ email: formValues.email, password: formValues.password })
    setFormValues({email: '', password: ''})
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLIonInputElement>) => {
    if (isFormValid && e.key === 'Enter') handleClick()
  }

  return (
    <VStack gap={4}>
      <VStack gap={4}>
          <IonInput
            label="Email"
            type="email"
            name="email"
            fill='solid'
            value={formValues.email}
            onIonInput={handleInput}
          />
          <IonInput
            label="Password"
            type="password"
            name="password"
            fill='solid'
            value={formValues.password}
            onIonInput={handleInput}
            onKeyDown={handleKeyDown}
          />
      </VStack>
      <HStack width='100%' justify='space-between' flex='1'>
        <IonRouterLink className={formLink} routerLink={linkData.path}>
          {linkData.message}
        </IonRouterLink>

        <span className={formButtonStyles}>
          <IonButton type="button" disabled={!isFormValid} onClick={handleClick}>
            {linkData.actionText}
          </IonButton>
        </span>
      </HStack>
    </VStack>
  )
}

export default AuthForm
