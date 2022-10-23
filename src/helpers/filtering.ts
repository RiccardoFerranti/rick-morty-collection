import { TDictionary } from "../commonTypes";

export const filterArrayByKeyValue = (array: TDictionary[], key: string, value: string) => {
  return array.filter((obj: TDictionary) => obj[key].toLowerCase().trim() === value.toLowerCase().trim());
}