import LoginContext from "../context/LoginContext";
import Button from "./common/Button";
import Card from "./common/Card";
import Center from "./common/Center";
import SessionDetector from "./common/SessionDetector";

export default function MainView() {
    return <SessionDetector>
        <LoginContext.Consumer>
            {(loginContext) => <Center>
                <Card title="This is you">
                    Name: {loginContext.user?.name}<br />
                    E-mail: {loginContext.user?.email}<br />
                    Nickname: {loginContext.user?.nickname}<br />
                    Role: {loginContext.user?.role}<br />
                    <Button kind="error" onClick={() => { loginContext.logout(); }}>Log out</Button>
                </Card>
            </Center>}
        </LoginContext.Consumer>
    </SessionDetector>;
}