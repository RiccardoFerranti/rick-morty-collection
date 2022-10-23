import { fireEvent, render, screen } from '@testing-library/react';

import Dropdown, { IDropdownProps } from '../Dropdown';

describe('Dropdown', () => {
  let mockedProps: IDropdownProps;

  const renderView = (props: IDropdownProps = mockedProps) => render(<Dropdown {...props} />);
  const mockedOnChangeFn = ()  => jest.fn();

  const testOptions = [
    { label: 'TestA', value: 'test a' },
    { label: 'TestB', value: 'test b' },
    { label: 'TestC', value: 'test c' },
  ];

  
  beforeEach(() => {
    mockedProps = {
      label: 'test label',
      value: 'test value',
      options: testOptions,
      onChange: mockedOnChangeFn,
    }
  })

  it('should render properly the dropdown label', () => {
    renderView();

    expect(screen.getByText(mockedProps.label)).toBeInTheDocument()
  });
  
  it('should render properly the dropdown options values', () => {
    renderView();

    testOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    })
  });

  it('should select properly the dropdown value', () => {
    renderView();

    const dropdown: HTMLInputElement = screen.getByRole('combobox');

    expect(dropdown.value).toBe(testOptions[0].value)

    fireEvent.click(dropdown, { target: { value: `${testOptions[2].value}` } })
    expect(dropdown.value).toBe(testOptions[2].value)
  });
});
