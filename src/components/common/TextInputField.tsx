/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { colorAccept, colorError, colorPrimary, colorSecondary } from "../../constants";

export type TextInputFieldProps = {
    maxlength?: number,
    minlength?: number,
    placeholder?: string,
    id: string,
    label?: string,
    type?: "text" | "password" | "email",
    required?: boolean,
};

export const textInputStyle: CSSInterpolation = {
    borderStyle: "solid",
    borderRadius: "0.5em",
    borderWidth: "0.2em",
    marginBlock: "0.25em",
    padding: "0.5em",
    "&:placeholder-shown": {
        borderColor: colorPrimary
    },
    "&:invalid": {
        borderColor: colorError,
    },
    "&:valid": {
        borderColor: colorAccept,
    },
    "&:focus": {
        boxShadow: "0 0 0 0.25em " + colorSecondary,
    }
}

export default function TextInputField(props: TextInputFieldProps) {
    return <>
        {props.label != null ? <label htmlFor={props.id}>{props.label}</label> : undefined}
        <input css={css(textInputStyle)} type={props.type} maxLength={props.maxlength} minLength={props.minlength} placeholder={props.placeholder} id={props.id} name={props.id} required={props.required}/>
    </>;
};