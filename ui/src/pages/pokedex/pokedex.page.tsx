import {IonContent, IonHeader, IonPage} from '@ionic/react'
import {gridOutline} from 'ionicons/icons'
import {useMemo} from 'react'
import {Toast} from '../../components/common'
import {PokedexCard} from '../../components/pokemon'
import {ERROR_MESSAGES} from '../../constants'
import {useFavoriteMutations, usePokedexMutations, usePokedexQueries} from '../../hooks'
import {HeaderIcon, MainContent, PageHeader} from '../../layout'


export const PokedexPage = () => {
  const {isError, isLoading, pokemons} = usePokedexQueries()
  const {handleDeletePokemon} = usePokedexMutations()
  const {isFavoriteMutationPending, handleAddFavorite, handleDeleteFavorite} = useFavoriteMutations()

  const showLoading = useMemo(() => isLoading || isFavoriteMutationPending, [isLoading, isFavoriteMutationPending])

  const handleFavorite = (id: number) => {
    if (!pokemons) return

    const selectedPokemon = pokemons.find((pokemon) => pokemon.id === id)
    if (!selectedPokemon) return

    if (selectedPokemon.isFavorite)
      handleDeleteFavorite(`${id}`)
    else
      handleAddFavorite(`${id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <PageHeader pageTitle='Pokedex' isLoading={showLoading}>
          <HeaderIcon icon={gridOutline} to='/pokemon' />
        </PageHeader>
      </IonHeader>
      <IonContent>
        <MainContent>
          {!!pokemons
            ? (pokemons.map(pokemon => (
                <PokedexCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onDelete={() => handleDeletePokemon(`${pokemon.id}`)}
                  onFavorite={() => handleFavorite(pokemon.id)}
                />
              )))
            : null
          }
          <Toast isOpen={isError} message={ERROR_MESSAGES.pokedex} />
        </MainContent>
      </IonContent>
    </IonPage>
  );
}

export default PokedexPage;
