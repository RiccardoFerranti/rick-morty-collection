import { FC } from "react";
import { StyledSorting } from "./Sorting.style";

const Sorting: FC<any> = ({ children }) => {
  return (
    <StyledSorting>
      {children}
    </StyledSorting>
  )
}

export default Sorting;