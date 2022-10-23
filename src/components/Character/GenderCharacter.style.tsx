import styled, { css } from 'styled-components';

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { RiGenderlessLine } from "react-icons/ri";

export const StyledGenderIcon = css`
  width: 40px;
  color: #BCFE92;
  margin-left: auto;
`

export const StyledBsGenderMale = styled(BsGenderMale)`
	${StyledGenderIcon}
`

export const StyledBsGenderFemale = styled(BsGenderFemale)`
	${StyledGenderIcon}
`

export const StyledRiGenderlessLine = styled(RiGenderlessLine)`
	${StyledGenderIcon}
`

export const StyledAiOutlineQuestionCircle = styled(AiOutlineQuestionCircle)`
	${StyledGenderIcon}
`