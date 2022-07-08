/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { colorAccept, colorAcceptDark, colorError, colorErrorDark, colorPrimary, colorPrimaryDark, colorSecondary, colorSecondaryDark, colorWarn, colorWarnDark } from "../../util/constants";

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

export const colorBackgroundCombinations:{[index: string]: CSSInterpolation} = {
    primary: {
        backgroundColor: colorPrimary,
        color: "white",
        "&:hover": {
            backgroundColor: colorPrimaryDark,
        }
    },
    secondary: {
        backgroundColor: colorSecondary,
        color: "black",
        "&:hover": {
            backgroundColor: colorSecondaryDark,
        }
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
        "&:hover": {
            backgroundColor: colorErrorDark,
        }
    },
    warn: {
        backgroundColor: colorWarn,
        color: "black",
        "&:hover": {
            backgroundColor: colorWarnDark,
        }
    }
};

export const ButtonStandard = styled.button([buttonTheme, colorBackgroundCombinations.primary], "button");

export const ButtonAccept = styled.button([buttonTheme, colorBackgroundCombinations.accept], "button");

export const ButtonCancel = styled.button([buttonTheme, colorBackgroundCombinations.error], "button");

export const ButtonSecondary = styled.button([buttonTheme, colorBackgroundCombinations.secondary], "button");

export const ButtonWarn = styled.button([buttonTheme, colorBackgroundCombinations.warn], "button");

export default function Button(props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {kind: "primary" | "secondary" | "accept" | "error" | "warn", nomargin?: boolean}){
    return <button css={css(buttonTheme, (props.nomargin ? {margin: 0, marginBlock: 0}:undefined), colorBackgroundCombinations[props.kind])} {...props}></button>
}



// export default function Button(props: React.DetailedHTMLProps<HTMLProps<HTMLButtonElement>,HTMLButtonElement>&{type: "standard" | "secondary" | "accept" | "cancel" | "warn"}) {
//    switch(props.type) {
//        case "secondary":
//            return <ButtonSecondary {...props} />;
//    }
//}