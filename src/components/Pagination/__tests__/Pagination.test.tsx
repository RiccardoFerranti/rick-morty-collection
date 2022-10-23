import { screen } from '@testing-library/react';

import Pagination, { IPaginationProps } from '../Pagination';
import renderWithProvider from '../../../../testUtils';

describe('Pagination', () => {
  let mockedProps: IPaginationProps;
  let lastPage: number; 
  
  const renderView = (props: IPaginationProps = mockedProps) => renderWithProvider(<Pagination { ...props } />);
  
  beforeEach(() => {
    mockedProps = {
      totalCount: 826,
      siblingCount: 1,
      currentPage: 1,
      pageSize: 20,
    };
    lastPage = Math.ceil(mockedProps.totalCount / mockedProps.pageSize);
  });
  
  
  it('should render the pagination properly when the `currentPage` is 1', () => {
    renderView();

    // it shouldn't render render Prev
    expect(screen.queryByText('Prev')).not.toBeInTheDocument();

    // it should render 6 page numbers
    [1, 2, 3, 4, 5, lastPage].forEach((page: number) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });

    // it should render … just once
    expect(screen.getAllByText('…').length).toBe(1);

    // it should render Next
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
  
  it('should render the pagination properly when the `currentPage` is 6', () => {
    mockedProps.currentPage = 6;
    renderView();

    // it should render Prev
    expect(screen.getByText('Prev')).toBeInTheDocument();

    // it should renders 5 page numbers
    [1, 5, 6, 7, lastPage].forEach((page: number) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });

    // it should render … twice
    expect(screen.getAllByText('…').length).toBe(2);

    // it should render Next
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
  
  it('should render the pagination properly when the `currentPage` is last page 42', () => {
    mockedProps.currentPage = lastPage;
    renderView();

    // it should render Prev
    expect(screen.getByText('Prev')).toBeInTheDocument();

    // it should render 6 page numbers
    [1, 38, 39, 40, 41, lastPage].forEach((page: number) => {
      expect(screen.getByText(page)).toBeInTheDocument();
    });

    // it should render … just once
    expect(screen.getAllByText('…').length).toBe(1);

    // it shouldn't render render Next
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });
});
