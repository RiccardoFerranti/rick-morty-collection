export const charactersDetails = [{
  id: '1',
  name: 'Rick Sanchez',
  species: 'Human',
  gender: 'Male',
  type: '',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  status: 'Alive',
  origin: {
    dimension: 'Dimension C-137',
    id: '1',
    name: 'Earth (C-137)',
    type: 'Planet',
    residents: [
      {
        id: '4',
        image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg',
        name: 'Beth Smith'
      }
    ]
  },
  episode: [{
      id: '1',
      episode: 'S01E01',
      name: 'Pilot'
  }]
},
{
  id: '2',
  name: 'Morty Smith',
  species: 'Human',
  gender: 'Male',
  type: '',
  image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
  status: 'Alive',
  origin: {
    dimension: 'Dimension C-137',
    id: null,
    name: 'unknown',
    type: 'null',
    residents: []
  },
  episode: [{
      id: '1',
      episode: 'S01E01',
      name: 'Pilot'
  }]
}];

export const charactersDetailList = [{
  id: '1',
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  name: "Rick Sanchez"
},{
  id: '4',
  image: 'https://rickandmortyapi.com/api/character/avatar/38.jpeg',
  name: 'Beth Smith'
}]

export const episodeDetails = [{
  id: '1',
  air_date: "December 16, 2013",
  episode: "S01E01",
  name: 'Pilot',
  characters: charactersDetailList
}]

export const locationsByIds = [{
  id: '1',
  dimension: 'Dimension C-137',
  name: 'Earth (C-137)',
  type: 'Planet',
  residents: charactersDetailList
}]