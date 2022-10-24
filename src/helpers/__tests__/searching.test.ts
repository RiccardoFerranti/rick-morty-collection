import { searchArrayByKeyValue } from "../searching";

describe('searchArrayByKeyValue function', () => {
  it('should return an array containing the value passed', () => {
    const input = [
      { name: 'Rick Sanchez'},
      { name: 'Morty Smith'},
      { name: 'Summer Smith'},
      { name: 'Beth Smith'}
    ];
    const expectedResult = [ { name: 'Rick Sanchez' } ];

    expect(searchArrayByKeyValue(input, 'name', 'Rick')).toMatchObject(expectedResult)
  });

  it('should return an empty array when the value passed is not found', () => {
    const input = [
      { name: 'Rick Sanchez'},
      { name: 'Morty Smith'},
      { name: 'Summer Smith'},
      { name: 'Beth Smith'}
    ];
    const expectedResult: [] = [];

    expect(searchArrayByKeyValue(input, 'name', 'Test')).toMatchObject(expectedResult)
  });
});
