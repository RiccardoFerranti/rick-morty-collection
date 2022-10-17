import styled from "styled-components";
import { size } from "../../const/breakpoints";

export const StyleLoadingContainer = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin-top: 100px;

  p {
    position: relative;
    font-size: 28px;
    color: white;
    margin-right: 25px,
  }
`
export const StyleDotsAnimation = styled.div`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: white;
  color: white;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: .5s;
  margin-left: 20px;

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
    background-color: white;
    color: white;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
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
