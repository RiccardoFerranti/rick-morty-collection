import { screen } from '@testing-library/react';

import Loading, { ILoadingProps } from '../Loading';
import renderWithProvider from '../../../../testUtils';

describe('Loading', () => {
  const mockedProps: ILoadingProps = {
    title: 'test title',
  };

  const renderView = (props: ILoadingProps = mockedProps) => renderWithProvider(<Loading { ...props } />);

  it('should render the loading message properly', () => {
    renderView();
    expect(screen.getByText(`Loading ${mockedProps.title}`)).toBeInTheDocument();
  });
});

