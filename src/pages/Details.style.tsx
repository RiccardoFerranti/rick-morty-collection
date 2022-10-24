import styled from 'styled-components';

export const StyledButtonWrapper = styled.nav`
  display: flex;
  width: 100%;

  & button:last-child {
    margin-left: auto;
  }
`;

export const StyledBackButton = styled.button`
	color: ${({ theme }) => theme.colors.text};
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
