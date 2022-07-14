import LoginContext from "../context/LoginContext";
import Button from "./common/Button";
import Card from "./common/Card";
import Center from "./common/Center";
import PostCreate from "./common/PostCreate";
import PostList from "./common/PostList";
import SessionDetector from "./common/SessionDetector";

export default function MainView() {
    return <SessionDetector>
        <PostList>
            <PostCreate></PostCreate>
        </PostList>
    </SessionDetector>;
}