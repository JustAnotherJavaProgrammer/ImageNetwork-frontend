/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";

export type CardProps = {
    title: string;
    css?: CSSInterpolation
    contentCss?: CSSInterpolation
    children?: React.ReactNode;
}

export const cardStyle: CSSInterpolation = {
    boxShadow: "0.06em 0.06em 0.2em 0.1em rgba(0,0,0,0.25)",
    padding: "0.5em",
};

// TODO: closeable, onClose
export default function Card(props: CardProps) {
    return <section css={css(null,cardStyle, props.css)} >
        <h2>{props.title}</h2>
        <div>
            {props.children}
        </div>
    </section>;
}