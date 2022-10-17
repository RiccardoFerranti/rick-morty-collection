import { FC } from "react";
import { StyledDropdown, StyledSelect, StyledSelectLabel } from "./Dropdown.style";

const Dropdown: FC<any> = ({ label, value, options, onChange }) => {
  return (
    <StyledDropdown>
      <label>
        <StyledSelectLabel>{label}</StyledSelectLabel>
        <StyledSelect value={value} onChange={onChange}>
          {options.map((option: any) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </StyledSelect>
      </label>
    </StyledDropdown>
  );
};

export default Dropdown;