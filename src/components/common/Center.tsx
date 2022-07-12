import { CSSInterpolation } from "@emotion/serialize";
import styled from "@emotion/styled";
export const centerStyles: CSSInterpolation = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
};
export default styled.div(centerStyles);

