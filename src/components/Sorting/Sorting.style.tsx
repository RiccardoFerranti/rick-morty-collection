import styled from "styled-components";

import { size } from "../../consts/breakpoints";

export const StyledSorting = styled.section`
  position: absolute;
  right: 0;
  display: flex;
  padding-right: 10px;

  @media screen and (max-width: ${size.tablet}) {
		position: relative;
    margin: 0 0 20px 10px;
	}

  @media screen and (max-width: ${size.mobile}) {
		& div { 
      width: 50%;
    }
	}
`;

