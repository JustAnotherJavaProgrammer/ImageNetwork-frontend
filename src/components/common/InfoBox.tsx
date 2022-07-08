/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { DetailedHTMLProps, HTMLProps } from "react";
import { colorDefinitions, ColorString } from "../../util/constants";

export const infoBoxTheme: CSSInterpolation = {
    borderRadius: "0.5em",
    borderStyle: "solid",
    borderWidth: "0.1em",
    padding: "0.5em",
    margin: "0.5em",
};

const selectColors = (colorName: ColorString): CSSInterpolation => ({
    backgroundColor: colorDefinitions[colorName].default,
    borderColor: colorDefinitions[colorName].dark,
    color: colorDefinitions[colorName].text,
})

export default function InfoBox(props: DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> & { color: "primary" | "secondary" | "accept" | "error" | "warn" }) {
    return <div css={css(infoBoxTheme, selectColors(props.color))}>{props.children}</div>
}