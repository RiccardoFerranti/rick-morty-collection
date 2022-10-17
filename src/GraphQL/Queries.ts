import { gql } from "@apollo/client";

export const GET_COUNT_CHARACTERS = gql`
  query Characters {
    characters {
      info {
        count
      }
    }
  }
`

export const LOAD_ALL_CHARACTERS = gql`
  query($id: [ID!]!) {
    charactersByIds(ids: $id) {
      id
      name
      species
      gender
      type
      image
      status
      origin {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
      episode {
        id
        episode
        name
      }
    }
  }
`

export const LOAD_CHARACTERS = gql`
  query Characters($page: Int!, $characterName: String, $characterStatus: String, $characterGender: String) {
    characters(page: $page, filter: { name: $characterName, status: $characterStatus, gender: $characterGender }) {
      results {
        id
        name
        species
        gender
        type
        image
        status
        origin {
          id
          name
          type
          dimension
          residents {
            id
            name
            image
          }
        }
        episode {
          id
          episode
          name
        }
      }
      info {
        count
      }
    }
  }
`

export const LOAD_EPISODE_BY_ID = gql`
  query($id: ID!) {
    episodesByIds(ids: [$id]) {
      id
      name
      episode
      air_date
      characters {
        id
        image
        name
      }
    }
  }
`

export const LOAD_LOCATION_BY_ID = gql`
  query($id: ID!) {
    locationsByIds(ids: [$id]) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
    }
  }
`

export const LOAD_CHARACTER_BY_ID = gql`
  query($id: ID!) {
    charactersByIds(ids: [$id]) {
      id
      name
      species
      gender
      type
      image
      status
      origin {
        id
        name
        type
        dimension
        residents {
          id
          name
          image
        }
      }
      episode {
        id
        episode
        name
      }
    }
  }
`
