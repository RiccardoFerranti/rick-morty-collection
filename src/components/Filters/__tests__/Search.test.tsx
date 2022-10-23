import { fireEvent, screen } from '@testing-library/react';

import Search from '../Search';
import renderWithProvider from '../../../../testUtils';

describe('Search', () => {
  const renderView = () => renderWithProvider(<Search />);

  it('should render the field label properly', () => {
    renderView();
    expect(screen.getByLabelText('listing-search-input-text')).toBeInTheDocument();
  });

  it('should render the field with the value properly', () => {
    renderView();
    const inputValue = 'test';
    const searchInput: HTMLInputElement = screen.getByLabelText('listing-search-input-text');

    fireEvent.change(searchInput, { target: { value: inputValue } });

    expect(searchInput.value).toBe(inputValue);
  });

  it('should render the clear icon', () => {
    const { container } = renderView();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});

