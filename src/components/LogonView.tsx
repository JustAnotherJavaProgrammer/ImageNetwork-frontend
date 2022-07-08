import React from "react";
import { Link, Navigate } from "react-router-dom";
import LoginContext, { LoginData } from "../context/LoginContext";
import { focus } from "../util/dom";
import Button from "./common/Button";
import Card from "./common/Card";
import Center from "./common/Center";
import Column from "./common/Column";
import InfoBox from "./common/InfoBox";
import TextInputField from "./common/TextInputField";

export default class LogonView extends React.Component<{} | Readonly<{}>, {email: string, username: string, nickname: string, password: string, passwordrepeat: string}> {
    constructor(props: {} | Readonly<{}> | Readonly<{} | Readonly<{}>>) {
        super(props);
        this.state = {
            email: "",
            username: "",
            nickname: "",
            password: "",
            passwordrepeat: "",
        }
    }

    async logon(loginData: LoginData) {
        if (this.state.password === this.state.passwordrepeat) {
            await loginData.logon({ name: this.state.email, nickname: this.state.nickname, email: this.state.email, password: this.state.password });
        }
    }

    changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.id]: e.target.value } as any);
    }

    render() {
        const boundChangeHandler = this.changeHandler.bind(this);
        return <LoginContext.Consumer>{(function (this: LogonView,loginContext: LoginData) {
            if(loginContext.loggedIn) {return <Navigate to={"/"} />; }
            return <Center>
            <Card title="Create an account">
                <Column>
                    <>
                    <TextInputField type="email" id="email" label="E-mail address:" placeholder="test@example.com" minlength={3} required onEnter={focus("username")} onChange={boundChangeHandler}/>
                    {this.state.email.includes("@") ? <></> : <InfoBox color="error">Please enter a valid e-mail address</InfoBox>}
                    </>
                    <>
                    <TextInputField type="text" id="username" label="Your name:" placeholder="John Doe" required onEnter={focus("nickname")} onChange={boundChangeHandler}/>
                    {this.state.username.length > 0 ? <></> : <InfoBox color="error">Please a name for your account</InfoBox>}
                    </>
                    <>
                    <TextInputField type="text" id="nickname" label="A nickname:" placeholder="johnny123" required onEnter={focus("password")} onChange={boundChangeHandler}/>
                    {this.state.nickname.length > 0 ? <></> : <InfoBox color="error">Please choose a nickname</InfoBox>}
                    </>
                    <>
                    <TextInputField type="password" id="password" label="Choose a password:" placeholder="Your password" required onEnter={focus("passwordrepeat")} onChange={boundChangeHandler}/>
                    <TextInputField type="password" id="passwordrepeat" label="Repeat your password:" placeholder="Your password (again)" required onEnter={() => this.logon.call(this, loginContext)} onChange={boundChangeHandler}/>
                    {this.state.password === this.state.passwordrepeat ? <></> : <InfoBox color="error">Please repeat your password</InfoBox>}
                    </>
                    <Button kind="accept" onClick={() => this.logon.call(this, loginContext)}>Sign on</Button>
                    <Link to="/login">Already have an account? Sign in!</Link>
                </Column>
            </Card>
        </Center>
    }).bind(this)}
        </LoginContext.Consumer>;
    }
}

LogonView.contextType = LoginContext;