import { screen } from '@testing-library/react';

import NotFound from '../NotFound';
import renderWithProvider from '../../../testUtils';

describe('NotFound', () => {
  const renderView = () => renderWithProvider(
    <NotFound />,
    { isRouter: true, location: { path: '/' } },
  );

  it('should render the `404` properly', () => {
    renderView();
    expect(screen.getByText('404')).toBeInTheDocument();
  });
  
  it('should render the `Page Not Found` properly', () => {
    renderView();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should render the button `GO BACK TO HOME` properly', () => {
    renderView();

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('BACK')).toBeInTheDocument();
  });
});
