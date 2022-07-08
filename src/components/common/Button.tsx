/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { colorDefinitions, ColorString } from "../../util/constants";

export const buttonTheme:CSSInterpolation = {
    border: "none",
    borderRadius: "0.5em",
    boxShadow: "none",
    display: "inline-block",
    padding: "0.5em 1em",
    marginBlock: "0.5em", 
    fontSize: "1em",
    fontWeight: "bolder",
    textDecoration: "none",
    "&:hover": {
        cursor: "pointer",
    }
};

export const colorBackgroundCombinations = (colorName: ColorString): CSSInterpolation => ({
    backgroundColor: colorDefinitions[colorName].default,
    color: colorDefinitions[colorName].text,
    "&:hover": {
        backgroundColor: colorDefinitions[colorName].dark,
    }
});

export const ButtonStandard = styled.button([buttonTheme, colorBackgroundCombinations("primary")], "button");

export const ButtonAccept = styled.button([buttonTheme, colorBackgroundCombinations("accept")], "button");

export const ButtonCancel = styled.button([buttonTheme, colorBackgroundCombinations("error")], "button");

export const ButtonSecondary = styled.button([buttonTheme, colorBackgroundCombinations("secondary")], "button");

export const ButtonWarn = styled.button([buttonTheme, colorBackgroundCombinations("warn")], "button");

export default function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {kind: ColorString, nomargin?: boolean}){
    return <button css={css(buttonTheme, (props.nomargin ? {margin: 0, marginBlock: 0}:undefined), colorBackgroundCombinations(props.kind))} {...props}></button>
}