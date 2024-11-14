import {IonRouterOutlet} from '@ionic/react'
import {lazy, Suspense} from 'react'
import {Redirect, Route} from 'react-router-dom'
import Loading from '../../components/misc/Loading'

const PokedexPage = lazy(() => import('../../pages/pokedex/pokedex.page'))
const PokemonDetailsPage = lazy(() => import('../../pages/pokemon/PokemonDetails.page'))
const PokemonListPage = lazy(() => import('../../pages/pokemon/PokemonList.page'))

function PrivateSections() {
  return (
    <IonRouterOutlet>
      <Suspense fallback={<Loading />}>
        <Route exact path="/pokedex" component={PokedexPage} />
        <Route exact path="/pokemon" component={PokemonListPage} />
        <Route path="/pokemon/:id" component={PokemonDetailsPage} />
      </Suspense>
      <Redirect exact from="/" to='/pokemon' />
    </IonRouterOutlet>
  )
}

export default PrivateSections;
