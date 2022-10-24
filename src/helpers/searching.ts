import { TDictionary } from "../commonTypes";

export const searchArrayByKeyValue = (array: Array<TDictionary<string>>, key: string, value: string) => {
  return array.filter((obj: TDictionary<string>) => obj[key].toLowerCase().trim().includes(value.toLowerCase().trim()));
}
