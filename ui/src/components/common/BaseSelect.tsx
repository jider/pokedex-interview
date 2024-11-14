import {IonSelect, IonSelectOption, type SelectCustomEvent} from '@ionic/react'
import {useMemo} from 'react'
import {toSortedAlphabeticallyArrayObject} from '../../utils'

interface BaseSelectProps {
  data: Array<any>
  valueKey: string
  displayKey: string
  onChange: (e: SelectCustomEvent) => void
}

function BaseSelect({data, displayKey, valueKey, onChange}: BaseSelectProps) {
  const sortedData = useMemo(() => toSortedAlphabeticallyArrayObject(data, displayKey), [data])

  return (
    <IonSelect
      aria-label="Pokemons"
      placeholder="Select a Pokemon"
      onIonChange={onChange}
    >
      {sortedData.map(item => (
        <IonSelectOption key={item[valueKey]} value={item[valueKey]}>{item[displayKey]}</IonSelectOption>
      ))}
    </IonSelect>
  );
}

export default BaseSelect;
