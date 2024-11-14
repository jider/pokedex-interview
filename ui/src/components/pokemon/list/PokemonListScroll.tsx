import {IonInfiniteScroll, IonInfiniteScrollContent} from '@ionic/react'
import PokemonList from './PokemonList'
import {usePokemons} from '../../../hooks'

function PokemonListScroll() {
  const {pokemons, fetchNextPage} = usePokemons()

  return (
    <>
      <PokemonList pokemons={pokemons} />
      <IonInfiniteScroll
        onIonInfinite={async (ev) => {
          const {isFetched} = await fetchNextPage()
          if (isFetched) await ev.target.complete()
        }}
      >
        <IonInfiniteScrollContent/>
      </IonInfiniteScroll>
    </>
  )
}

export default PokemonListScroll
