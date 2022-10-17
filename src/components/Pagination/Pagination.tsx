import { FC, useMemo } from "react";
import { StyledPageDots, StyledPageNumber, StyledPagesContainer, StyledPageText } from "./Pagination.style";
// import { StyledPage, StyledPagesContainer, StyledPagination, StyledPaginationButton } from "./Pagination.style";
import usePagination, { DOTS } from './usePagination';

interface IPaginationProps {
  count: number,
}


const Pagination: FC<any> = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;


  // console.log('currentPage', currentPage)
  // console.log('totalCount', totalCount)
  // console.log('siblingCount', siblingCount)
  // console.log('pageSize', pageSize)

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange?.length || paginationRange.length === 1) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange?.[paginationRange.length - 1];

  return (
    <StyledPagesContainer>
      {currentPage !== 1 ? 
        <StyledPageText onClick={onPrev}>Prev</StyledPageText>
      : null}
      {paginationRange?.map((pageNumber: number | string) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <StyledPageDots>&#8230;</StyledPageDots>;
        }
		
        // Render our Page Pills
        // console.log(pageNumber === currentPage)
        return (
          <StyledPageNumber
            selected={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </StyledPageNumber>
        );
      })}
      {currentPage !== lastPage ?
        <StyledPageText onClick={onNext}>Next</StyledPageText>
      : null}
    </StyledPagesContainer>
  );
};

export default Pagination
