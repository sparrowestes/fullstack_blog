import * as React from 'react';
import { blog } from '../client/types';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SingleBlog: React.FC<SingleBlogProps> = (props: SingleBlogProps) => {
    const [blog, setBlog] = React.useState<blog>({
        id: null,
        title: "",
        content: "",
        name: "",
        tags: []
    });

    React.useEffect(() => {
        (async () => {
            let data = await fetch(`/api/blogs/${props.match.params.id}`)
            let blog = await data.json();
            setBlog(blog);
        })();
    }, []);

    return (
        <div className="shadow card home-blog-card m-3">
            <div className="card-body">
                <h3 className="card-title">{blog.title}</h3>
                <h6 className="card-subtitle mb-2 text-muted">{blog.name}</h6>
                { }
                <p className="card-text">{blog.content}</p>
                {blog.tags?.map((tag: { name: string })  => <span className="badge badge-pill badge-secondary m-1">{tag.name}</span>)}
                <div className="space my-3">
                    <Link to={`/blog/${blog.id}/admin`}>
                        <button className="btn btn-sm btn-dark float-right">Admin Options
            </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

interface SingleBlogProps extends RouteComponentProps<{ id: string }> { }

export default SingleBlog