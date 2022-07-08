/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { colorPrimary } from "../../util/constants";

const logoStyle:CSSInterpolation = {
    fontWeight: "bold",
    fontSize: "1.5em",
    marginInlineEnd: "0.5em",
    color: colorPrimary
};

export default function Logo() {
    return <div css={css(logoStyle)}>ImageNetwork logo</div>
}