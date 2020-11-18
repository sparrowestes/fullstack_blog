import React from 'react';
import { RouteComponentProps } from "react-router-dom";


const SingleBlog: React.FC<ISingleBlogProps> = (props: ISingleBlogProps) => {
    const [blog, setBlog] = React.useState<blog>({
        title: "",
        name: "",
        content: ""
    });

    React.useEffect(() => {
        (async () => {
            try {
                let res = await fetch(`/api/blogs/${props.match.params.id}`);
                let blog = await res.json();
                setBlog(blog);
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const deleteBlog = async (id: string) => {
        await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });

        props.history.push("/");
    };

    const updateBlog = async (id: string, name: string, content: string) => {
        const newBlog = {
            name: blog.name,
            content: blog.content,
            title: blog.title
        }

        await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBlog)
        });

        props.history.push("/");
    };

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBlog({
        id: blog.id,
        name: blog.name,
        content: e.target.value,
        title: e.target.value
    });

    return (
        <div className="container">
            <div className="card shadow-lg m-2">
                <div className="card-body">
                    <div className="row">
                        <h5 className="card-title">{blog.title}</h5>
                        <div className="container">
                            <h3>Author: {blog.name}</h3>
                        </div>
                        <div className="row">
                            <textarea className="card-text" defaultValue={blog.content} cols={50} rows={15} onChange={(e) => onMessageChange(e)}></textarea>
                        </div>
                        <button className="btn btn-sm btn-dark float-right mx-1" onClick={() => setBlog(blog.id)}>Save</button>
                        <button className="btn btn-sm btn-dark float-right mx-1" onClick={() => deleteBlog(blog.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



interface ISingleBlogProps extends RouteComponentProps<{ id: string }> { }

export default SingleBlog;