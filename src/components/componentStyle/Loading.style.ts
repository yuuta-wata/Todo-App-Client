import styled from 'styled-components';

export const LoadingSvg = styled.svg`
  position: relative;
  width: 30px;
  height: 30px;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingCircle = styled.circle`
  width: 100%;
  height: 100%;
  fill: none;
  stroke-width: 3;
  stroke: #00a1ff;
  stroke-linecap: round;
  transform: translate(5px, 5px);
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
  animation: animate 4s linear infinite;

  @keyframes animate {
    0% {
      stroke-dashoffset: 440;
    }
    50% {
      stroke-dashoffset: 410;
    }
    100% {
      stroke-dashoffset: 380;
    }
  }
`;
