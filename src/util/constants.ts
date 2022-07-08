export const app_name = "ImageNetwork";
export const tagline = "The network of images";
export const api = "http://localhost:8080";

export const colorPrimary = "#3d3b8e";
export const colorSecondary = "#009ffd";
export const colorAccept = "#5efc8d";
export const colorError = "#ad343e";
export const colorWarn = "#f2af29";

export const colorPrimaryDark = "#312f72";
export const colorSecondaryDark = "#007fca";
export const colorAcceptDark = "#4bca71";
export const colorErrorDark = "#8a2a32";
export const colorWarnDark = "#c28c21";

export const black = "black";
export const white = "white";

export type ColorDef = {
    default: string,
    dark: string,
    text: string
}

export type ColorString = "primary" | "secondary" | "accept" | "error" | "warn";

export const colorDefinitions:{[index:string]: ColorDef} = {
    primary: {
        default: colorPrimary,
        dark: colorPrimaryDark,
        text: white
    },
    secondary: {
        default: colorSecondary,
        dark: colorSecondaryDark,
        text: white
    },
    accept: {
        default: colorAccept,
        dark: colorAcceptDark,
        text: black
    },
    error: {
        default: colorError,
        dark: colorErrorDark,
        text: white
    },
    warn: {
        default: colorWarn,
        dark: colorWarnDark,
        text: black
    }
}