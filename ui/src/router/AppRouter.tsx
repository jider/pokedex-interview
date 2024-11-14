import {IonApp} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import {Route} from 'react-router-dom'
import {PrivateRoute, PublicRoute, PublicSections} from './components'
import PrivateSections from './components/PrivateSections'

const AppRouter = () => {
  return (
    <IonApp>
        <IonReactRouter>
          {/* Public */}
          <Route path='/*'>
            <PublicRoute>
              <PublicSections/>
            </PublicRoute>
          </Route>

          {/* Private */}
          <Route path='/'>
            <PrivateRoute>
              <PrivateSections />
            </PrivateRoute>
          </Route>
        </IonReactRouter>
    </IonApp>
  )
}

export default AppRouter
