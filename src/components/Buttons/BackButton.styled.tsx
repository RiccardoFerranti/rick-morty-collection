import styled from 'styled-components';

export const StyledBackButton = styled.button`
	color: white;
  background: none;
  border: none;
  height: 40px;
  cursor: pointer;
  position: relative;

  svg {
    position: absolute;
    font-size: 20px;
    top: 10px;
  }

  span {
    padding: 0 0 0 25px;
  }
`;
