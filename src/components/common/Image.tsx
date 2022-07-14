/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

type ImageProps = {
    src: string;
    alt?: string;
};

export default function Image(props: ImageProps) {
    return <img src={props.src} alt={props.alt ?? ""} css={css({objectFit: "contain", maxWidth: "75vmin"})/*css({
        display: "inline-block",
        alignSelf: "center",
        objectFit: "contain",
//        width: "100%",
//        height: "100%",
//        minWidth: "0",
//        minHeight: "0",
//        maxWidth: "100%",
//        maxHeight: "100%",
        flexShrink: "100",
        flexBasis: 1,
        flexGrow: 0,
    })*/} />;
}