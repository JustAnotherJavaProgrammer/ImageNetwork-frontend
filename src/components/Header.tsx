/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { CSSInterpolation } from "@emotion/serialize";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Button, {  } from "./common/Button";
import Logo from "./common/Logo";
const headerStyles: CSSInterpolation = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 0.06em 0.2em 0.1em rgba(0,0,0,0.25)",
    padding: "0.5em",
};
export default function Header() {
    const navigate = useNavigate();
    return <LoginContext.Consumer>
        {(loginContext) =>
            <header css={css(headerStyles)}>
                <div css={css({ display: "flex", flexDirection: "row", alignItems: "center" })}><Logo /></div>
                <div css={css({ display: "flex", flexDirection: "row", alignItems: "center" })}>{loginContext.loggedIn ? 
                <>
                <span>{loginContext.user?.name}</span>
                <Button kind="error" onClick={() => { loginContext.logout(); }} css={css({
                    marginInlineStart: "0.5em",
                })} nomargin>Log out</Button>
                </> : 
                <Button kind="primary" onClick={()=> navigate("/login")} nomargin>Sign in</Button>}</div>
            </header>}
    </LoginContext.Consumer>
}