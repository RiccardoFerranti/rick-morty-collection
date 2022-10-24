import { FC } from "react";

import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { StyledBackButton } from "./BackButton.styled";

const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <StyledBackButton 
      type='button'
      id='back-buttonn'
      onClick={() => navigate(-1)}
      aria-label='back-button'
    >
      <IoMdArrowBack />
      <span>BACK</span>
    </StyledBackButton>
  )
}

export default BackButton;
