import * as React from 'react';
import { Link } from "react-router-dom";


class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            blogs: []
        };
    }

    async componentDidMount() {
        try {
            let r = await fetch('/api/blogs');
            let blogs = await r.json();
            this.setState({ blogs });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <>
                <div className="showcase">
                    <div className="container">
                        {this.state.blogs.map((blog => (
                            <div key={blog.id} className="cardBlog">
                                <div className="container">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <div className="container">
                                        <h3>Author: {blog.name}</h3>
                                    </div>
                                    <div className="container">
                                        <p className="card-text">{blog.content}</p>
                                    </div>
                                    <div className="container">
                                        <div className="space"></div>
                                        <Link to={`/blogs/${blog.id}/admin`}>
                                            <button className="btn btn-sm btn-dark">Admin Options</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }


export interface IAppState {
    blogs: Array<{ title: string, content: string, id: number, name: string }>;
}

export default App;