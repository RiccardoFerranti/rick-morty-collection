import { screen } from '@testing-library/react';

import Layout from '../Layout';
import renderWithProvider from '../../../testUtils';

describe('Layout', () => {
  const routerConfig = { isRouter: true, path: '/' };
  const LayoutComponent = () => <Layout><div>test</div></Layout>;
  
  it('should render the header properly', () => {
     renderWithProvider(<LayoutComponent />, routerConfig);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should render the children properly', () => {
    renderWithProvider(<LayoutComponent />, routerConfig)
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

