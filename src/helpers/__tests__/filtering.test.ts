import { filterArrayByKeyValue } from "../filtering";

describe('filterArrayByKeyValue function', () => {
  it('should return an array containing the exact value passed', () => {
    const input = [
      { gender: 'male'},
      { gender: 'female'},
      { gender: 'genderless'},
      { gender: 'unknown'}
    ];
    const expectedResult = [ { gender: 'male' } ];

    expect(filterArrayByKeyValue(input, 'gender', 'male')).toMatchObject(expectedResult)
  });

  it('should return an empty array when the value passed is not found', () => {
    const input = [
      { gender: 'male'},
      { gender: 'female'},
      { gender: 'genderless'},
      { gender: 'unknown'}
    ];
    const expectedResult: [] = [];

    expect(filterArrayByKeyValue(input, 'gender', 'test')).toMatchObject(expectedResult)
  });
});
