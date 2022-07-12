import { CSSInterpolation } from "@emotion/serialize";
import styled from "@emotion/styled";

export const columnStyle : CSSInterpolation = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-start",
};
export default styled.div(columnStyle);