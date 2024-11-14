import {IonPage} from '@ionic/react'
import {useState} from 'react'
import type {RouteComponentProps} from 'react-router'
import {AuthMainContent} from '../../components/auth'
import {Toast} from '../../components/common'
import {ERROR_MESSAGES} from '../../constants'
import type {AuthUser} from '../../interfaces'
import {useAuthContext} from '../../hooks'

interface AuthPageProps extends RouteComponentProps {}

const SignUpPage = ({history}: AuthPageProps) => {
  const { signUp } = useAuthContext()
  const [showError, setShowError] = useState(false)

  const handleSignUp = async (authUser: AuthUser) => {
    const response = await signUp(authUser)
    if (response) history.push('/pokemon')
    else setShowError(true)
  }

  return (
    <IonPage>
      <AuthMainContent title='Sign Up' onClick={handleSignUp} />
      <Toast
        isOpen={showError}
        message={ERROR_MESSAGES.signUp}
        onDismiss={() => setShowError(false)}
      />
    </IonPage>
  )
}

export default SignUpPage
