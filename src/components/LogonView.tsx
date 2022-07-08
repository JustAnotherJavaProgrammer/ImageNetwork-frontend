import { Link, Navigate } from "react-router-dom";
import LoginContext, { LoginData } from "../context/LoginContext";
import { focus } from "../util/dom";
import Button from "./common/Button";
import Card from "./common/Card";
import Center from "./common/Center";
import Column from "./common/Column";
import TextInputField from "./common/TextInputField";

export default function LogonView() {
    return <LoginContext.Consumer>{loginContext => !loginContext.loggedIn ? <Center>
        <Card title="Create an account">
            <Column>
                <TextInputField type="email" id="email" label="E-mail address:" placeholder="test@example.com" minlength={3} required onEnter={focus("username")} />
                <TextInputField type="text" id="username" label="Your name:" placeholder="John Doe" required onEnter={focus("nickname")} />
                <TextInputField type="text" id="nickname" label="A nickname:" placeholder="johnny123" required onEnter={focus("password")} />
                <TextInputField type="password" id="password" label="Choose a password:" placeholder="Your password" required onEnter={focus("passwordrepeat")} />
                <TextInputField type="password" id="passwordrepeat" label="Repeat your password:" placeholder="Your password (again)" required onEnter={() => logon(loginContext)} />
                <Button kind="accept" onClick={() => logon(loginContext)}>Log in</Button>
                <Link to="/login">Already have an account? Sign in!</Link>
            </Column>
        </Card>
    </Center> : <Navigate to={"/"} />}
    </LoginContext.Consumer>;
};

async function logon(loginContext: LoginData) {
    const username = document.getElementById("username") as HTMLInputElement;
    const nickname = document.getElementById("nickname") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const passwordrepeat = document.getElementById("passwordrepeat") as HTMLInputElement;
    if (password.value === passwordrepeat.value) {
        await loginContext.logon({ name: username.value, nickname: nickname.value, email: email.value, password: password.value });
    }
}