import { sortArrayAlphabeticallyByKeyValue, sortArrayNumericallyByKeyValue } from "../sorting";

describe('sortArrayNumericallyByKeyValue function', () => {
  it('should return an array sorted in ascendent way when sorting is `ASC`', () => {
    const input = [ { id: 1 }, { id: 4 }, { id: 2 }, { id: 3 }];
    const expectedResult = [{ id: 1 },{ id: 2 },{ id: 3 },{ id: 4 }];

    expect(sortArrayNumericallyByKeyValue(input, 'ASC', 'id')).toMatchObject(expectedResult)
  });
  
  it('should return an array sorted in descendent way when sorting is `DESC`', () => {
    const input = [ { id: 1 }, { id: 4 }, { id: 2 }, { id: 3 }];
    const expectedResult = [{ id: 4 },{ id: 3 }, { id: 2 }, { id: 1 }];

    expect(sortArrayNumericallyByKeyValue(input, 'DESC', 'id')).toMatchObject(expectedResult)
  });
});

describe('sortArrayAlphabeticallyByKeyValue function', () => {
  it('should return an array sorted in ascendent way when sorting is `ASC`', () => {
    const input = [
      { name: 'Rick Sanchez'},
      { name: 'Morty Smith'},
      { name: 'Summer Smith'},
      { name: 'Beth Smith'}
    ];
    const expectedResult = [
      { name: 'Beth Smith'},
      { name: 'Morty Smith'},
      { name: 'Rick Sanchez'},
      { name: 'Summer Smith'}
    ];

    expect(sortArrayAlphabeticallyByKeyValue(input, 'ASC', 'name')).toMatchObject(expectedResult)
  });
  
  it('should return an array sorted in descendent way when sorting is `DESC`', () => {
    const input = [
      { name: 'Rick Sanchez'},
      { name: 'Morty Smith'},
      { name: 'Summer Smith'},
      { name: 'Beth Smith'}
    ];
    const expectedResult = [
      { name: 'Summer Smith'},
      { name: 'Rick Sanchez'},
      { name: 'Morty Smith'},
      { name: 'Beth Smith'}
    ];

    expect(sortArrayAlphabeticallyByKeyValue(input, 'DESC', 'name')).toMatchObject(expectedResult)
  });
});
