import { TRootState } from '../characters.reducer';
import { ICharactersState } from './characters.slice';

export const charactersSelector = (state: TRootState): ICharactersState => state.characters;
