import { render, screen, within } from '@testing-library/react';
import renderWithProvider from '../../../../testUtils';
import Sorting from '../Sorting';

describe('Sorting', () => {
  const renderView = () => renderWithProvider(<Sorting />);

  it('should render the 2 sorting components properly', () => {
    renderView();

    expect(screen.getByLabelText('sorting-numeric-field-id')).toBeInTheDocument();
    expect(screen.getByLabelText('sorting-alphabetical-field-name')).toBeInTheDocument();
  });
  
  it('should render the sorting `labels` properly', () => {
    renderView();

    expect(screen.getByText('Sort by ID:')).toBeInTheDocument();
    expect(screen.getByText('Sort by Name:')).toBeInTheDocument();
  });

  it('should render just 2 sorting `icons` properly', () => {
    const { container } = renderView();
    expect(container.querySelectorAll('svg').length).toBe(2);
  });
});