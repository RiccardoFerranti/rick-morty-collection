import { cloneDeep } from "lodash";
import { TDictionary } from "../commonTypes";
import { ICharacter } from "../models";

export const SET_ALL_CHARACTERS = 'SET_ALL_CHARACTERS';
export const SET_CHARACTERS_TO_RENDER = 'SET_CHARACTERS_TO_RENDER';

interface ICharactersInitialState {
  allCharacters: ICharacter[],
  charactersToRender: {
    characters: ICharacter[],
    totalCount: number
  }
}

export const charactersInitialState: ICharactersInitialState = {
  allCharacters: [],
  charactersToRender: {
    characters: [],
    totalCount: 0
  }
};

export function charactersReducer(state: ICharactersInitialState, action: TDictionary): ICharactersInitialState {
  switch (action.type) {
    case SET_ALL_CHARACTERS: {
      const newState = cloneDeep(state);
      return {
        ...newState,
        allCharacters: action.payload.characters,
      }
    }

    case SET_CHARACTERS_TO_RENDER: {
      let newState = cloneDeep(state);
      return {
        ...newState,
        charactersToRender: {
          ...newState.charactersToRender,
          characters: action.payload.characters,
          totalCount: action.payload?.totalCount
        }
      }
    }

    default:
      return state;
  }
}
