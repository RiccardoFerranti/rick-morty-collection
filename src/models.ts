export interface ResourceBase {
  id: number
  name: string
  url?: string
  created?: string
}

interface ICharacterLocation {
  name: string
  url: string
}

export interface IEpisodeGraphQL {
  id: string,
  episode: string,
  name: string
}

export interface IResident {
  id: string,
  name: string,
  image: string
}

export interface IOriginGraphQL {
  id: string | null,
  dimension: string | null,
  name: string,
  type: string | null,
  residents: IResident[]
}

export interface ICharacter extends ResourceBase {
  status: 'Dead' | 'Alive' | 'unknown'
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  location?: ICharacterLocation
  image: string
  episode: IEpisodeGraphQL[],
  origin: IOriginGraphQL
}