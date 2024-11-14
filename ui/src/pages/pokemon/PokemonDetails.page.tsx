import {IonContent, IonPage} from '@ionic/react'
import type {RouteComponentProps} from 'react-router'
import Toast from '../../components/common/Toast'
import NoData from '../../components/misc/NoData'
import Loading from '../../components/misc/Loading'
import {
  PokemonImage,
  PokemonName,
  PokemonOtherStats,
  PokemonMainStats,
  PokemonTypes,
  HeaderDetails
} from '../../components/pokemon'
import {ERROR_MESSAGES} from '../../constants'
import type {PokemonStats} from '../../interfaces'
import {useFavoriteMutations, usePokedexMutations, usePokemonDetails} from '../../hooks'
import {MainContentDetails} from '../../layout'
import {css} from '../../../styled-system/css'
import {Center, HStack, VStack} from '../../../styled-system/jsx'


interface Params { id: string }
interface PokemonDetailsPageProps extends RouteComponentProps<Params> {}

export const PokemonDetailsPage = ({match}: PokemonDetailsPageProps) => {
  const id = match.params.id
  const {isLoading, isError, pokemonDetails} = usePokemonDetails(id)
  const {isPokedexMutationPending, handleAddPokemon, handleDeletePokemon} = usePokedexMutations()
  const {isFavoriteMutationPending, handleAddFavorite, handleDeleteFavorite} = useFavoriteMutations()

  const handlePokemonToPokedex = () => {
    if (!pokemonDetails) return

    if (pokemonDetails.inPokedex)
      handleDeletePokemon(id)
    else
      handleAddPokemon(id)
  }

  const handlePokemonAsFavorite = () => {
    if (!pokemonDetails) return

    if (pokemonDetails.isFavorite)
      handleDeleteFavorite(id)
    else
      handleAddFavorite(id)
  }

  return (
    <IonPage>
      <IonContent>
        {isLoading && <Loading />}

        {!isLoading && !pokemonDetails && <NoData />}

        {!!pokemonDetails
          ? (
            <MainContentDetails bgColor={pokemonDetails.bgColor}>
              <HeaderDetails
                pokemon={pokemonDetails}
                onAdd={handlePokemonToPokedex}
                onFavorite={handlePokemonAsFavorite}
                disableAdd={isPokedexMutationPending}
                disableFavorite={isFavoriteMutationPending}
              />

              <VStack gap={6} width='100%'>
                <PokemonImage image={pokemonDetails.image} name={pokemonDetails.name} />
                <PokemonName name={pokemonDetails.name} />
                <Center className={css({maxWidth: '80%'})}>
                  <PokemonTypes types={pokemonDetails.details.types} />
                </Center>

                {/* Other stats */}
                <PokemonOtherStats otherStats={pokemonDetails.details.otherStats} />

                <HStack alignItems='flex-start'>
                  {/* Stats */}
                  <PokemonMainStats stats={pokemonDetails.details.stats} title='Stats' />

                  {/* abilities */}
                  <PokemonMainStats
                    stats={pokemonDetails.details.abilities.map(a => ({name: a, baseStat: 0} as PokemonStats))}
                    title='Abilities' />
                </HStack>
              </VStack>
            </MainContentDetails>
          )
          : null
        }

        <Toast isOpen={isError} message={ERROR_MESSAGES.details} />
      </IonContent>
    </IonPage>
  )
}

export default PokemonDetailsPage
