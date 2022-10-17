import { FC } from "react";
import { StyledDropdownFilters, StyledResetFilterIcon, StyledResetFilters } from "./Filters.style";

const Filters: FC<any> = ({ children, onHandleResetFilters }) => {
  console.log('children', children)
  return (
    <StyledDropdownFilters>
      {children}
      <StyledResetFilters onClick={onHandleResetFilters}>
        Reset fiters
        <StyledResetFilterIcon />
      </StyledResetFilters>
    </StyledDropdownFilters> 
  );
};

export default Filters;