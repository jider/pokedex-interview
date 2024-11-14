import {useMemo, useState} from 'react'
import {
  IonContent,
  IonHeader,
  IonModal,
  IonPage, SelectCustomEvent,
  useIonRouter,
} from '@ionic/react'
import {
  closeCircleOutline,
  filterOutline, invertModeOutline, searchOutline,
} from 'ionicons/icons'
import {BaseSelect, Toast} from '../../components/common'
import {PokemonFilter, PokemonList, PokemonListScroll} from '../../components/pokemon'
import {ERROR_MESSAGES} from '../../constants'
import type {IndexedType} from '../../interfaces'
import {usePokemons, usePokemonsByType} from '../../hooks'
import {BaseHeader, HeaderIcon, MainContent, PageHeader} from '../../layout'


const PokemonListPage = () => {
  const router = useIonRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<IndexedType>()
  const [showSearch, setShowSearch] = useState(false)

  const {isError, isLoading, hasNextPage, pokemons} = usePokemons()
  const {pokemons: pokemonsByType, isFilterError, isFilterLoading} = usePokemonsByType(selectedType)

  const canShowError = useMemo(() => isError || isFilterError, [isError, isFilterError])
  const canShowLoading = useMemo(() => isLoading || isFilterLoading, [isLoading, isFilterLoading])
  const canShowPokemonsList = useMemo(() => !selectedType && pokemons.length > 0, [selectedType, pokemons])
  const canShowPokemonsByType = useMemo(() => !!selectedType && !!pokemonsByType && pokemonsByType.pokemons.length > 0, [selectedType, pokemonsByType])

  const handleClearFilter = () => {
    setSelectedType(undefined)
    setIsOpen(false)
  }
  const handleFilter = (type: IndexedType) => {
    setSelectedType(type)
    setIsOpen(false)
  }

  const handleSearch = (e: SelectCustomEvent) => {
    setShowSearch(false)
    router.push(`/pokemon/${e.detail.value}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <PageHeader
          pageTitle="Pokemon List"
          isLoading={canShowLoading}
          showBottom={showSearch}
          bottom={
            <BaseSelect
              data={canShowPokemonsByType ? pokemonsByType?.pokemons! : pokemons}
              valueKey='id'
              displayKey='name'
              onChange={handleSearch}
            />
          }
        >
          <HeaderIcon icon={invertModeOutline} to='/pokedex' />
          <HeaderIcon icon={searchOutline} onClick={() => {setShowSearch(prevState => !prevState)}} />
          {!selectedType &&
            <HeaderIcon icon={filterOutline} onClick={() => {setIsOpen(true)}} />
          }
          {!!selectedType &&
            <HeaderIcon icon={closeCircleOutline} onClick={() => {handleClearFilter()}} />
          }
        </PageHeader>
      </IonHeader>

      <IonContent fullscreen>
        <MainContent>
          {/* Pokemon Gallery */}
          {canShowPokemonsList && <PokemonListScroll />}

          {/* Pokemon Filter */}
          {canShowPokemonsByType && <PokemonList pokemons={pokemonsByType?.pokemons ?? []}/>}

          <Toast isOpen={canShowError} message={ERROR_MESSAGES.list}/>
        </MainContent>

        {/* Filter modal */}
        <IonModal isOpen={isOpen}>
          <IonHeader>
            <BaseHeader right={
              <HeaderIcon  icon={closeCircleOutline} onClick={() => setIsOpen(false)} />
            }/>
          </IonHeader>
          <IonContent>
            <MainContent>
              <PokemonFilter onClick={handleFilter}/>
            </MainContent>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
)
}

export default PokemonListPage
