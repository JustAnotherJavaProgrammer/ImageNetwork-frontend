/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { Children, ReactElement, ReactNode } from "react";
import { getPosts, Paginated, Post as ApiPost } from "../../util/api";
import Column from "./Column";
import InfoBox from "./InfoBox";
import Post from "./Post";
import Spinner from "./Spinner";

export default class PostList extends React.Component<{children: ReactNode}, {posts: undefined | null | Paginated<ApiPost>}> {
    constructor(props: {children: ReactNode}) {
        super(props);
        this.state = {
            posts: undefined,
        };
        getPosts().then(posts => { this.setState({ posts }); }).catch((err) => { console.error(err); this.setState({ posts: null }); });
    }
    render() {
        return <Column css={css({
            alignItems: "center",
            padding: "0.5em",
        })}>
            {this.props.children}
            {this.state.posts === undefined ? <Spinner></Spinner> : 
            this.state.posts === null ? <InfoBox color="warn">Couldn't load posts</InfoBox> :
            <>{(function (this: PostList){
                const elements: ReactElement[] =  this.state.posts?.data.map((post, i) => <Post key={i} post={post}></Post>) ?? [];
                if(this.state.posts?.moreAvailable) {
                    elements.push(<Spinner key={this.state.posts?.data?.length +1}/>);
                } else {
                    elements.push(<InfoBox color="primary" key={this.state.posts?.data?.length ?? 0 +1}>That's it! You've seen them all.</InfoBox>);
                }
                return elements;
            }).call(this)}</>}
        </Column>;
    }
}