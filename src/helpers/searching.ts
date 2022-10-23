import { TDictionary } from "../commonTypes";

export const searchArrayByKeyValue = (array: Array<TDictionary>, key: string, value: string) => {
  return array.filter((obj: TDictionary) => obj[key].toLowerCase().trim().includes(value.toLowerCase().trim()));
}
