import { Navigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import Button from "./common/Button";
import Card from "./common/Card";
import Center from "./common/Center";
import Column from "./common/Column";
import TextInputField from "./common/TextInputField";

export default function LogonView() {
    return <LoginContext.Consumer>{loginContext => !loginContext.loggedIn ? <Center>
        <Card title="Log in">
            <Column>
                <TextInputField type="email" id="username" label="E-mail address:" placeholder="test@example.com" minlength={3} required={true} />
                <TextInputField type="password" id="password" label="Password:" placeholder="Your password" required={true} />
                <Button kind="accept" onClick={async () => {
                    const username = document.getElementById("username") as HTMLInputElement;
                    const password = document.getElementById("password") as HTMLInputElement;
                    await loginContext.login(username.value, password.value);
                }}>Log in</Button>
            </Column>
        </Card>
    </Center> : <Navigate to={"/"} />}
    </LoginContext.Consumer>;
};