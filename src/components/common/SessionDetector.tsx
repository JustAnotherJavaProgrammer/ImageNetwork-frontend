import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import Center from "./Center";
import Spinner from "./Spinner";

export default function SessionDetector(props: { children: ReactNode }) {
    return <LoginContext.Consumer>
        {(loginContext) => loginContext.loggedIn ? <>{props.children}</> :
            (loginContext.user === undefined ?
                (loginContext.detectSession(), <Center><Spinner /></Center>) :
                <Navigate to={"/login"} />
            )}
    </LoginContext.Consumer>;
}