import React from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import {getPost, Post as ApiPost} from "../../util/api";

export type PostProps = {
    id: number;
}

type PostState = {
    post: undefined | null | ApiPost;
};

export default class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            post: undefined,
        };
        getPost(this.props.id).then(post => { this.setState({ post: post.data }); }).catch((err) => { console.error(err); this.setState({ post: null }); });
    }

    render() {
        return <Card title={this.state.post?.title ?? "Post"}>
            {this.state.post === undefined ? <Spinner /> : (this.state.post === null ? <div>Post not found</div> : <div>{this.state.post.comment}</div>)}
        </Card>
    }
}