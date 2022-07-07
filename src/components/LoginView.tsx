import { Navigate } from "react-router-dom";
import LoginContext, { LoginData } from "../context/LoginContext";
import Button from "./common/Button";
import Card from "./common/Card";
import Center from "./common/Center";
import Column from "./common/Column";
import TextInputField from "./common/TextInputField";

export default function LoginView() {
    return <LoginContext.Consumer>{loginContext => !loginContext.loggedIn ? <Center>
        <Card title="Log in">
            <Column>
                <TextInputField type="email" id="username" label="E-mail address:" placeholder="test@example.com" minlength={3} required={true} onEnter={() => {
                    document.getElementById("password")?.focus();
                }} />
                <TextInputField type="password" id="password" label="Password:" placeholder="Your password" required={true} onEnter={() => login(loginContext)} />
                <Button kind="accept" onClick={() => login(loginContext)}>Log in</Button>
            </Column>
        </Card>
    </Center> : <Navigate to={"/"} />}
    </LoginContext.Consumer>;
};

async function login(loginContext: LoginData) {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    await loginContext.login(username.value, password.value);
}