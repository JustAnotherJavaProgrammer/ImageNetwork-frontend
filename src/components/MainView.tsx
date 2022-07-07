import { Navigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Card from "./common/Card";
import Center from "./common/Center";
import Spinner from "./common/Spinner";

export default function MainView() {
    return <LoginContext.Consumer>
        {(loginContext) => loginContext.loggedIn ?
            <Center>
                <Card title="This is you">
                    Name: {loginContext.user?.name}<br />
                    E-mail: {loginContext.user?.email}<br />
                    Nickname: {loginContext.user?.nickname}<br />
                    Role: {loginContext.user?.role}
                </Card>
            </Center> :
            (loginContext.user === undefined ?
                (loginContext.detectSession(), <Center><Spinner /></Center>) :
                <Navigate to={"/login"} />
            )}
    </LoginContext.Consumer>
}