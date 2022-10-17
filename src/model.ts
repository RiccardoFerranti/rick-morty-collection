export interface ResourceBase {
  id: number
  name: string
  url: string
  created: string
}

interface ICharacterOrigin {
  name: string,
  url: string
}

interface ICharacterLocation {
  name: string,
  url: string
}

export interface ICharacter extends ResourceBase {
  status: string,
  species: string,
  type:	string,
  gender:	string,
  origin:	ICharacterOrigin,
  location:	ICharacterLocation,
  image: string,
  episode: Array<string>,
}