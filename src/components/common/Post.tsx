/** @jsxImportSource @emotion/react */

import React from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import { getPost, Post as ApiPost } from "../../util/api";
import Image from "./Image";
import InfoBox from "./InfoBox";
import Center, { centerStyles } from "./Center";
import Column, { columnStyle } from "./Column";
import { css } from "@emotion/react";

export type PostProps = {
    id: number;
    post?: never
} | {
    post: ApiPost;
    id?: never;
}

type PostState = {
    post: undefined | null | ApiPost;
};

export default class Post extends React.Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
            post: props.post ?? undefined,
        };
        if (this.state.post === undefined)
            getPost(this.props.id as number).then(post => { this.setState({ post: post.data }); }).catch((err) => { console.error(err); this.setState({ post: null }); });
    }

    render() {
        return <Card title={this.state.post?.title ?? "Post"} css={{
            minWidth: "320px",
            width: "75vw",
            maxWidth: "min(75vw, 769px)",
            minHeight: "300px",
            height: "75vh",
            maxHeight: "769px",
            margin: "0.5em"
        }}>
            {this.state.post === undefined ?
                <Center><Spinner /></Center> :
                (this.state.post === null ?
                    <InfoBox color="warn">Post not found</InfoBox> :
                    <figure>
                        <Image src={this.state.post?.image} />
                        <figcaption css={css({ display: "block", maxWidth: "min(75vw, 769px)" })}>{this.state.post.comment}</figcaption>
                    </figure>)}
        </Card>
    }
}