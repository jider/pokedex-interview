import {IonRouterOutlet} from '@ionic/react'
import {lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import Loading from '../../components/misc/Loading'

const SignInPage = lazy(() => import('../../pages/auth/signIn.page'))
const SignUpPage = lazy(() => import('../../pages/auth/signUp.page'))

function PublicSections() {
  return (
    <IonRouterOutlet>
      <Suspense fallback={<Loading />}>
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/sign-up" component={SignUpPage} />
      </Suspense>
    </IonRouterOutlet>
  );
}

export default PublicSections;
