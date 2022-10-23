import styled from "styled-components";

import { size } from "../../consts/breakpoints";


export const StyleErrorContainer = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin-top: 100px;

  p {
    font-weight: 600;
    font-size: 26px;
    color: red;
    text-align: center;

    @media screen and (max-width: ${size.mobile}) {
      font-size: 18px;
    }
  }
`