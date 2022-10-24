import { range } from '../usePagination';

describe('Range function', () => {
  it('should return an array containing all the numbers passed in the range', () => {
    const expectedResult = [1, 2, 3, 4, 5, 6];
    expect(range(1, 6)).toMatchObject(expectedResult)
  });

  it('should return an array containing just 6 when the start and end are both 6', () => {
    const expectedResult = [6];
    expect(range(6, 6)).toMatchObject(expectedResult)
  });
  
  it('should return an empty array containing when the start is less than end', () => {
    const expectedResult: [] = [];
    expect(range(6, 5)).toMatchObject(expectedResult)
  });
});
