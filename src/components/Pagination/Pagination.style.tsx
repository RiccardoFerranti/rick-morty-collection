import styled from "styled-components";

export const StyledPaginationButton = styled.button`
  background: none;
  border: none;
  color: #e1e2e2;
  font-size: 14px;
`;

export const StyledPagesContainer = styled.ul`
  font-size: 14px;
  padding: 30px 0;
  width: 320px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  justify-content: space-between;

  &.dots:hover {
    background-color: transparent;
    cursor: default;
  }
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  &.selected {
    background-color: grey;
  }
`;

interface IStyledPageNumber {
  selected?: boolean,  
}

export const StyledPageNumber = styled.li<IStyledPageNumber>`
  background: ${({ selected }) => selected ? '#B2B2B2' : 'none'};
  color: ${({ selected }) => selected ? '#000' : '#FFF'};
  width: 25px;
  height: 25px;
  border-radius: 25px;
  text-align: center;
  padding: 4px 0 0 0;

  &:hover {
    background-color: #F0F0F0;
    color: black;
  }

  & > li:first-child,
  & > li:last-child {
    width: auto;
  }
`;

export const StyledPageText =  styled.li`
  color: ${({ theme }) => theme.colors.text};
  width: 25px;
  height: 25px;
  border-radius: 20px;
  text-align: center;
  padding: 4px 0 0 0;
  text-decoration: underline;
`

export const StyledPageDots = styled.li<IStyledPageNumber>`
  color: ${({ theme }) => theme.colors.text};
  width: 25px;
  height: 25px;
  text-align: center;
  padding: 4px 0 0 0;
`;
