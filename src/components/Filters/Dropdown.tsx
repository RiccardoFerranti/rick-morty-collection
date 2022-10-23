import { FC, FormEvent, memo } from "react";

import { StyledDropdown, StyledSelect, StyledSelectLabel } from "./Dropdown.style";

interface IDropdownOption {
  value: string,
  label: string
}
export interface IDropdownProps {
  label: string,
  value: string,
  options: IDropdownOption[],
  onChange: (e: FormEvent<HTMLSelectElement>) => void
}

const Dropdown: FC<IDropdownProps> = ({ label, value, options, onChange }) => (
  <StyledDropdown aria-label={`listing-dropdown-${label.replaceAll(' ', '-').toLocaleLowerCase()}`}>
    <label>
      <StyledSelectLabel>{label}</StyledSelectLabel>
      <StyledSelect value={value} onChange={onChange}>
        {options.map((option: IDropdownOption) => (
          <option 
            key={option.value}
            value={option.value}
            data-testid={`${label.replaceAll(' ', '-').toLocaleLowerCase()}-option`}>{option.label}</option>
        ))}
      </StyledSelect>
    </label>
  </StyledDropdown>
);

export default memo(Dropdown);