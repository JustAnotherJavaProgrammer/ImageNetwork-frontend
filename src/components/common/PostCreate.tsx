/** @jsxImportSource @emotion/react */
import { CSSInterpolation } from "@emotion/serialize";
import React, { ChangeEvent } from "react";
import Button, { buttonTheme, colorBackgroundCombinations } from "./Button";
import Card from "./Card";
import Column from "./Column";
import TextInputField, { textInputStyle } from "./TextInputField";
import Image from "./Image";
import { createPost } from "../../util/api";

export const textareaStyle: CSSInterpolation = [textInputStyle, {
    resize: "none",
}];



export default class PostCreate extends React.Component<{}, { title: string, comment: string, image: FileList | null }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            title: "",
            comment: "",
            image: null,
        };
    }

    changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ [e.target.id.slice(5)]: e.target.value } as any);
    }

    imageChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ image: e.target.files });
    }

    submit(e: React.FormEvent<HTMLButtonElement>) {
        console.log("submit");
        e.preventDefault();
        if (this.state.image != null && this.state.image.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                createPost({ title: this.state.title, image: reader.result as string, comment: this.state.comment });
            };
            reader.readAsDataURL(this.state.image[0]);
        }

    }

    render() {
        const boundChangeHandler = this.changeHandler.bind(this);
        const boundImageChangeHandler = this.imageChangeHandler.bind(this);

        return <Card title="Post something">
            <form>
                <Column>
                    <TextInputField id="post-title" label="Title: " required type="text" size={74} onChange={boundChangeHandler} />
                    <label htmlFor="post-image" css={[buttonTheme, colorBackgroundCombinations("secondary")]}>Upload an image...</label>
                    <input id="post-image" name="post-image" type="file" accept="image/*" style={{ display: "none" }} onChange={boundImageChangeHandler} />
                    {(this.state.image?.length ?? 0) > 0 ? <Image src={this.state.image === null ? "" : URL.createObjectURL(this.state?.image[0])} alt="post-image" /> : <></>}
                    <label htmlFor="post-comment">Comment: </label>
                    <textarea id="post-comment" css={textareaStyle} name="post-comment" required placeholder="A comment for your image" wrap="soft" minLength={1} maxLength={1000} rows={5} cols={75} onChange={boundChangeHandler as unknown as (e: ChangeEvent<HTMLTextAreaElement>) => void}></textarea>
                    <Button kind="accept" type="button" onClick={this.submit.bind(this)}>Publish</Button>
                </Column>
            </form>
        </Card>
    }
}