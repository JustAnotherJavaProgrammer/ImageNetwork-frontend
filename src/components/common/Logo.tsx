/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { Link } from "react-router-dom";
import { colorPrimary } from "../../util/constants";

const logoStyle:CSSInterpolation = {
    fontWeight: "bold",
    fontSize: "1.5em",
    marginInlineEnd: "0.5em",
    color: colorPrimary,
    textDecoration: "none",
};

export default function Logo() {
    return <Link to={"/"} css={css(logoStyle)}>ImageNetwork logo</Link>
}