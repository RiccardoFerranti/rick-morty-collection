import { TDictionary } from "../commonTypes";

export const filterArrayByKeyValue = (array: Array<TDictionary<string>>, key: string, value: string) => {
  return array.filter((obj: TDictionary<string>) => obj[key].toLowerCase().trim() === value.toLowerCase().trim());
}
