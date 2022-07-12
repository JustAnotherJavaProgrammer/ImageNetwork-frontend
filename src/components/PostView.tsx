import Center from "./common/Center";
import Post, { PostProps } from "./common/Post";
import SessionDetector from "./common/SessionDetector";
import {useParams} from "react-router-dom";

export default function PostView() {
    return <SessionDetector>
        <Center>
            <Post id={Number.parseInt(useParams()["id"] as string)}></Post>
        </Center>
    </SessionDetector>;
}