import { screen, fireEvent } from '@testing-library/react';
import renderWithProvider from '../../../../testUtils';
import SortingAlphabeticalField, { ISortingAlphabeticalFieldProps } from '../SortingAlphabeticalField';

describe('SortingAlphabeticalField', () => {
  const mockedProps: ISortingAlphabeticalFieldProps = {
    label: 'test label',
    active: true,
    sorting: 'ASC',
    onClick: jest.fn()
  };

  const renderView = (props: ISortingAlphabeticalFieldProps = mockedProps) => renderWithProvider(<SortingAlphabeticalField {...props} />);

  it('should render the `label` properly', () => {
    renderView();
    expect(screen.getByText(`Sort by ${mockedProps.label}:`)).toBeInTheDocument();
  });

  it('should call `onClick` function properly', () => {
    renderView();

    const sortingElement = screen.getByLabelText('sorting-alphabetical-field-test-label');
    fireEvent.click(sortingElement);

    expect(mockedProps.onClick).toHaveBeenCalled();
  });
});
