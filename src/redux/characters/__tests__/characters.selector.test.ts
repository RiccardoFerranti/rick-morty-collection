import { charactersSelector } from '../characters.selector';
import { TRootState } from '../../characters.reducer';
import { generateMockedState } from '../../../../testUtils';

describe('Characters Selectors', () => {  
  const state: TRootState = { characters: generateMockedState() };

  it('should return the correct state', () => {
    expect(charactersSelector(state)).toMatchObject(state.characters);
  });
});
