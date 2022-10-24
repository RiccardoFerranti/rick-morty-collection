import styled from "styled-components";

import { size } from "../../consts/breakpoints";

export const StyleLoadingContainer = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  top: 500px;
  left: 50%;
  transform: translate(-50%);

  p {
    position: relative;
    font-size: 28px;
    color: ${({ theme }) => theme.colors.text};
    margin-right: 25px,
  }

  @media screen and (max-width: ${size.mobile}) {
    top: 300px;
	}
`
export const StyleDotsAnimation = styled.div`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: .5s;
  margin-left: 20px;

  @media screen and (max-width: ${size.mobile}) {
    width: 4px;
    height: 4px;
    border-radius: 2px;
    margin-left: 15px;
	}

  &::before, &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }

  &::before {
    left: -15px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.text};
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;

    @media screen and (max-width: ${size.mobile}) {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      left: -10px;
    }
  }

  &::after {
    left: 15px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #d3d3d3;
    color: #d3d3d3;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;

    @media screen and (max-width: ${size.mobile}) {
      width: 4px;
      height: 4px;
      border-radius: 2px;
      left: 10px;
    }
  }

  @keyframes dotFlashing {
    0% {
      background-color: white;
    }
    50%,
    100% {
      background-color: #bcbcbc;
    }
  }
`

export const StyledLoadingText = styled.span`
  font-size: 26px;

  @media screen and (min-width: ${size.tablet}) and (max-width: ${size.desktopS}) {
    font-size: 22px;
	}

  @media screen and (max-width: ${size.tablet}) {
    font-size: 18px;
	}
`
