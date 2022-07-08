/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { colorAccept, colorAcceptDark, colorError, colorPrimary, colorSecondary, colorWarn } from "../../constants";

export const buttonTheme:CSSInterpolation = {
    border: "none",
    borderRadius: "10%",
    boxShadow: "none",
    display: "inline-block",
    padding: "0.5em 1em",
    marginBlock: "0.5em", 
    fontSize: "1em",
    fontWeight: "bolder",
    "&:hover": {
        cursor: "pointer",
    }
};

export const colorBackgroundCombinations:{[index: string]: CSSInterpolation} = {
    primary: {
        backgroundColor: colorPrimary,
        color: "white",
    },
    secondary: {
        backgroundColor: colorSecondary,
        color: "black",
    },
    accept: {
        backgroundColor: colorAccept,
        color: "black",
        "&:hover": {
            backgroundColor: colorAcceptDark,
        }
    },
    error: {
        backgroundColor: colorError,
        color: "white",
    },
    warn: {
        backgroundColor: colorWarn,
        color: "black",
    }
};

export const ButtonStandard = styled.button([buttonTheme, colorBackgroundCombinations.primary], "button");

export const ButtonAccept = styled.button([buttonTheme, colorBackgroundCombinations.accept], "button");

export const ButtonCancel = styled.button([buttonTheme, colorBackgroundCombinations.error], "button");

export const ButtonSecondary = styled.button([buttonTheme, colorBackgroundCombinations.secondary], "button");

export const ButtonWarn = styled.button([buttonTheme, colorBackgroundCombinations.warn], "button");

export default function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {kind: "primary" | "secondary" | "accept" | "error" | "warn"}){
    return <button css={css(buttonTheme, colorBackgroundCombinations[props.kind])} {...props}></button>
}



// export default function Button(props: React.DetailedHTMLProps<HTMLProps<HTMLButtonElement>,HTMLButtonElement>&{type: "standard" | "secondary" | "accept" | "cancel" | "warn"}) {
//    switch(props.type) {
//        case "secondary":
//            return <ButtonSecondary {...props} />;
//    }
//}