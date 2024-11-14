import {IonPage} from '@ionic/react'
import {useState} from 'react'
import type {RouteComponentProps} from 'react-router'
import {AuthMainContent} from '../../components/auth'
import {Toast} from '../../components/common'
import {ERROR_MESSAGES} from '../../constants'
import {useAuthContext} from '../../hooks'
import type {AuthUser} from '../../interfaces'

interface AuthPageProps extends Partial<RouteComponentProps> {}

const SignInPage = ({history}: AuthPageProps) => {
  const { signIn } = useAuthContext()
  const [showError, setShowError] = useState(false)

  const handleSignIn = async (authUser: AuthUser) => {
    const response = await signIn(authUser)
    if (response) history?.push('/pokemon')
    else setShowError(true)
  }

  return (
    <IonPage>
      <AuthMainContent title='Sign In' onClick={handleSignIn} />
      <Toast
        isOpen={showError}
        message={ERROR_MESSAGES.signIn}
        onDismiss={() => setShowError(false)}
      />
    </IonPage>
  )
}

export default SignInPage
