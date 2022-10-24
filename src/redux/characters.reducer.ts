import { combineReducers } from '@reduxjs/toolkit';

import { charactersSlice } from './characters/characters.slice';

export const rootReducer = combineReducers({
  characters: charactersSlice.reducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
