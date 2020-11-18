import React from 'react';
import { RouteComponentProps } from "react-router-dom";
// import { chirp } from "../types";

const AddBlog: React.FC<IAddBlogProps> = (props: IAddBlogProps) => {
    const [blog, setBlog] = React.useState<blog>({
        name: "",
        title: "",
        content: ""
    });

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setBlog({
        name: e.target.value,
        content: blog.content,
        title: blog.title
    });

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBlog({
        name: blog.name,
        content: e.target.value
    });

    const saveBlog = async () => {
        await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        });

        props.history.push("/");
    };

    return (
        <div className="container">
            <div className="card shadow-lg m-2">
                <div className="card-body">
                    <div className="row">
                        <input type="text" className="card-title" defaultValue="" onChange={onUsernameChange}/>
                    </div>
                    <div className="row">
                        <textarea className="card-text" defaultValue={blog.content} cols={50} rows={15} onChange={onMessageChange}></textarea>
                    </div>
                    <button className="btn btn-sm btn-outline-dark float-right mx-1" onClick={saveBlog}>Save</button>
                </div>
            </div>
        </div>
    )
}

interface IAddBlogProps extends RouteComponentProps { }

export default AddBlog