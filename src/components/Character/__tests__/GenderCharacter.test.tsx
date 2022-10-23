import { render, screen } from '@testing-library/react';

import GenderCharacter, { IGenderCharacterProps } from '../GenderCharacter';

describe('GenderCharacter', () => {  
  const renderView = (props: IGenderCharacterProps) => render(<GenderCharacter {...props} />);


  it('should not render the nothing when gender prop is not `male`, `female, `genderless` or `unknown`', () => {
    const mockedProps = { gender: 'none' };
    renderView(mockedProps);

    ['male', 'female', 'genderless', 'unknown'].forEach((gender) => {
      expect(screen.queryByTestId(`gender-icon-${gender}`)).toBe(null);
    })
  });
  
  it('should render the component with the male icon when the gender prop is `male`', () => {
    const mockedProps = { gender: 'male' };
    renderView(mockedProps);

    expect(screen.getByTestId(`gender-icon-${mockedProps.gender}`)).toBeInTheDocument();
  });
  
  it('should render the component with the female icon when the gender prop is `female`', () => {
    const mockedProps = { gender: 'female' };
    renderView(mockedProps);

    expect(screen.getByTestId(`gender-icon-${mockedProps.gender}`)).toBeInTheDocument();
  });
  
  it('should render the component with the genderless icon when the gender prop is `genderless`', () => {
    const mockedProps = { gender: 'genderless' };
    renderView(mockedProps);

    expect(screen.getByTestId(`gender-icon-${mockedProps.gender}`)).toBeInTheDocument();
  });
  
  it('should render the component with the unknown icon when the gender prop is `unknown`', () => {
    const mockedProps = { gender: 'unknown' };
    renderView(mockedProps);

    expect(screen.getByTestId(`gender-icon-${mockedProps.gender}`)).toBeInTheDocument();
  });
});
