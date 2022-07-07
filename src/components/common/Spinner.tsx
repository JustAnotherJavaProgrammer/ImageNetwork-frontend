/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { colorAccept, colorError, colorPrimary, colorSecondary, colorWarn } from "../../constants";

const spinAnimation = keyframes`
    from {
      transform: rotate(0deg);
    }
  
    to {
      transform: rotate(360deg);
    }
`;

const translatedSpinAnimation = keyframes`
    from {
      transform: rotate(0deg) translate(0, 4.25em);
    }
  
    to {
      transform: rotate(360deg) translate(0, 4.25em);
    }
`;

const spinnerStyle = css`
border: 1.5em solid ${colorSecondary};
  border-top-color: ${colorError};
  border-right-color: ${colorWarn};
  border-bottom-color: ${colorAccept};
  width: 10em;
  height: 10em;
  border-radius: 50%;
  border-style: solid;
  animation: ${spinAnimation} 10s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
  ::before {
    content: \"\";
    position: absolute;
    border: 2em solid ${colorSecondary};
    border-top-color: ${colorError};
    border-right-color: ${colorWarn};
    border-bottom-color: ${colorAccept};
    top: 15%;
    left: 15%;
    right: 15%;
    bottom: 15%;
    border-radius: 50%;
    border-style: solid;
    animation: ${spinAnimation} 5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
  }
  &::after {
    content: \"\";
    background-color: ${colorPrimary};
    position: absolute;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    left: 4.25em;
    top: 4.25em;
    /* transform: translate(0, 4.25em); */
    animation: ${translatedSpinAnimation} 15s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite reverse;
}
`;

export default function Spinner() {
    return <div css={spinnerStyle} />;
}