import { FC, memo } from "react";
import { setCurrentPage } from "../../redux/characters/characters.slice";
import { useAppDispatch } from "../../redux/store";
import { StyledPageDots, StyledPageNumber, StyledPagesContainer, StyledPageText } from "./Pagination.style";
import usePagination, { DOTS } from './usePagination';

export interface IPaginationProps {
  totalCount: number,
  siblingCount?: number,
  currentPage: number,
  pageSize: number,
}

const Pagination: FC<IPaginationProps> = props => {
  const { totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const dispatch = useAppDispatch();
  
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  
  // If there are less than 2 times in pagination range we shall not render the component
  if (!paginationRange?.length || paginationRange.length === 1) return null;

  const onNext = () => {
    dispatch(setCurrentPage({ currentPage: currentPage + 1 }));
  };

  const onPrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage({ currentPage: currentPage - 1 }))
  };

  let lastPage = paginationRange?.[paginationRange.length - 1];

  return (
    <StyledPagesContainer>
      {currentPage !== 1 ? <StyledPageText onClick={onPrev}>Prev</StyledPageText> : null}
      {paginationRange?.map((pageNumber: number | string, index: number) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <StyledPageDots key={`dots-${index}`}>&#8230;</StyledPageDots>;
        }
		
        // Render page numbers
        return (
          <StyledPageNumber
            key={pageNumber}
            selected={pageNumber === currentPage}
            onClick={() => dispatch(setCurrentPage({ currentPage: +pageNumber }))}
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

export default memo(Pagination);
