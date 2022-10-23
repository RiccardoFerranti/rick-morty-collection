import { TDictionary } from "../commonTypes"

export const sortArrayNumericallyByKeyValue = (array: Array<TDictionary>, sorting: string, key: string) => (
  sorting === 'ASC'
    // sort by Number property ASCENDING (1 - 9)
    ? array.sort((a: TDictionary, b: TDictionary) => a.id - b.id)
    // sort by Number property DESCENDING (9 - 1)
    : array.sort((a: TDictionary, b: TDictionary) => b.id - a.id)
)

export const sortArrayAlphabeticallyByKeyValue = (array: Array<TDictionary>, sorting: string, key: string) => (
  sorting === 'ASC'
    // sort by String property ASCENDING (A - Z)
    ? array.sort((a: TDictionary, b: TDictionary) => a[key] > b[key] ? 1 : -1)
    // sort by String property DESCENDING (Z - A)
    : array.sort((a: TDictionary, b: TDictionary) => a[key] > b[key] ? -1 : 1)
)
