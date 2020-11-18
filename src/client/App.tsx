
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../components/Home";
import Navbar from '../components/Navbar';
import SingleBlog from '../components/SingleBlog';
import AddBlog from '../components/AddBlog';


const App: React.FC<IAppProps> = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={ Home } />
				<Route exact path="/blogs/:id/admin" component={ SingleBlog } />
				<Route exact path="/blogs/add"  component={ AddBlog } /> 
			</Switch>
		</Router>
	)
};

interface IAppProps { }

export default App