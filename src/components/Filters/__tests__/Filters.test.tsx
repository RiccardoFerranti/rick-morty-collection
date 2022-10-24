import { fireEvent, screen } from '@testing-library/react';
import { capitalize } from 'lodash';
import renderWithProvider from '../../../../testUtils';
import { filterKeys, genderOptions, specieOptions, statusOptions } from '../../../consts/filters';

import Filters from '../Filters';

describe('Filters', () => {
  const renderView = () => renderWithProvider(<Filters />);

  it('should render properly all the 3 dropdowns label', () => {
    renderView();

    filterKeys.forEach((label) => {
      expect(screen.getByText(capitalize(label))).toBeInTheDocument()
    })
  });

  it('should render properly the `reset filters` button', () => {
    renderView();

    screen.getByText('Reset filters');
  });
  
  it('should select properly the value in each dropdown', () => {
    renderView();

    const dropdowns: HTMLInputElement[] = screen.getAllByRole('combobox');

    const statusDropdown = dropdowns[0];
    const genderDropdown = dropdowns[1];
    const specieDropdown = dropdowns[2];

    expect(statusDropdown.value).toBe(statusOptions[0].value)
    expect(genderDropdown.value).toBe(genderOptions[0].value)
    expect(specieDropdown.value).toBe(specieOptions[0].value)

    fireEvent.click(statusDropdown, { target: { value: `${statusOptions[2].value}` } })
    fireEvent.click(genderDropdown, { target: { value: `${genderOptions[2].value}` } })
    fireEvent.click(specieDropdown, { target: { value: `${specieOptions[2].value}` } })
    
    expect(statusDropdown.value).toBe(statusOptions[2].value)
    expect(genderDropdown.value).toBe(genderOptions[2].value)
    expect(specieDropdown.value).toBe(specieOptions[2].value)
  });
});
