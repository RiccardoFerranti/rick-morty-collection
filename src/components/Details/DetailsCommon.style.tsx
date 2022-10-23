import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const StyledDetailCardCharacterImage = styled(LazyLoadImage)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
	display: block;
	margin: 5px auto 0;
`