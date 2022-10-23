import { ICharacter, IEpisodeGraphQL, IResident } from "../../models"

export interface IOriginGraphQL {
  id: string,
  dimension: string,
  name: string,
  type: string,
  residents: IResident[]
}

// export type TGraphQLCharacter = Omit<ICharacter, 'episode' | 'origin'>  & { 
//   episode: IEpisodeGraphQL[],
//   origin: IOriginGraphQL
// }
