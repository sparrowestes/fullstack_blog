import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Navbar from '../components/Navbar';
import SingleBlog from '../components/SingleBlog';
import EditBlog from '../components/EditBlog';
import CreateBlog from '../components/CreateBlog';



const App: React.FC<IAppProps> = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/blog/create" component={CreateBlog} />
				<Route exact path="/blog/:id/admin" component={EditBlog} />
				<Route exact path="/blog/:id" component={SingleBlog} />
				<Route exact path="/" component={Home} />
			</Switch>
		</Router>
	)
};


interface IAppProps { }

export default App