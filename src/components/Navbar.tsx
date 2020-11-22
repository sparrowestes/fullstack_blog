import React from 'react';
import { Link } from "react-router-dom";

const Navbar: React.FC<INavbarProps> = () => {
    return (
        <>
            <div className="background">
                <div className="navbar">
                    <div className="container flex">
                        <h1 className="logo">The Cats Meow</h1>
                        <nav>
                            <ul>
                                <li><Link to="/"><button className="btn btn-outline mx-3">Home</button></Link></li>
                                <li><Link to="/blog/create"><button className="btn btn-outline mx-3">Create Blog</button></Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

interface INavbarProps { }

export default Navbar