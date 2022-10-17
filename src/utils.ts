
export const searchArrayByKeyValue = (array: any, key: string, value: string) => {
  return array.filter((obj: any) => obj[key].toLowerCase().trim().includes(value.toLowerCase().trim()));
}

export const filterArrayByKeyValue = (array: any, key: string, value: string) => {
  return array.filter((obj: any) => obj[key].toLowerCase().trim() === value.toLowerCase().trim());
}

export const sortArrayNumericallyByKeyValue = (array: any, sorting: string, key: string) => (
  sorting === 'ASC'
    // sort by String property ASCENDING (A - Z)
    ? array.sort((a: any, b: any) => a.id - b.id)
    // sort by String property DESCENDING (Z - A)
    : array.sort((a: any, b: any) => b.id - a.id)
)

export const sortArrayAlphabeticallyByKeyValue = (array: any, sorting: string, key: string) => (
  sorting === 'ASC'
    // sort by String property ASCENDING (A - Z)
    ? array.sort((a: any, b: any) => a[key] > b[key] ? 1 : -1)
    // sort by String property DESCENDING (Z - A)
    : array.sort((a: any, b: any) => a[key] > b[key] ? -1 : 1)
)
