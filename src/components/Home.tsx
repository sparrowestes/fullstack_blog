import * as React from 'react';
import { blog } from '../client/types';
import { Link } from 'react-router-dom';


const Home: React.FC<HomeProps> = (props: HomeProps) => {
    const [blogs, setBlogs] = React.useState<blog[]>([]);

    React.useEffect(() => {
        (async () => {
            let data = await fetch('/api/blogs');
            let blogs = await data.json();
            blogs.reverse();
            setBlogs(blogs);
        })();
    }, [])

    return (
        <div className="container">
            {blogs.map(blog => (
                <div className="shadow cardBlog home-blog-card m-3">
                    <div className="card-body">
                        <h3 className="card-title">{blog.title}</h3>
                        <img src="images/catpawprint.jpg" alt="cat paw silhouette" />
                        <h6 className="card-subtitle mb-2 text-muted">{blog.name}</h6>
                        <p className="home-card-text">{blog.content}</p>
                        <Link to={`/blog/${blog.id}`}> 
                        <button className="btn btn-sm btn-dark">View Blog 
                        </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

interface HomeProps { }

export default Home