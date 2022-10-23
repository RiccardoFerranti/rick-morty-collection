import { render, screen, fireEvent } from '@testing-library/react';
import SortingNumericField, { ISortingNumericFieldProps } from '../SortingNumericField';

describe('SortingNumericField', () => {
  const mockedProps: ISortingNumericFieldProps = {
    label: 'test label',
    active: true,
    sorting: 'ASC',
    onClick: jest.fn()
  };

  const renderView = (props: ISortingNumericFieldProps = mockedProps) => render(<SortingNumericField {...props} />);

  it('should render the `label` properly', () => {
    renderView();
    expect(screen.getByText(`Sort by ${mockedProps.label}:`)).toBeInTheDocument();
  });

  it('should call `onClick` function properly', () => {
    renderView();

    const sortingElement = screen.getByLabelText('sorting-numeric-field-test-label');
    fireEvent.click(sortingElement);

    expect(mockedProps.onClick).toHaveBeenCalled();
  });
});

