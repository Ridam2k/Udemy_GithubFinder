import React from 'react';
import './App.css';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import Navbar from './components/layout/Navbar';
import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/Pages/About';
import User from './components/Users/User';

const App = () => {
	//fetching the original default users
	// const fetchUsers = async () => {
	// 	const res = await axios.get(
	// 		`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
	// 	);
	// 	setUsers(res.data);
	// 	setLoading(false);
	// };
	// useEffect(() => {
	// 	fetchUsers();
	// }, []);

	return (
		<GithubState>
			<AlertState>
				<Router>
					<div className='App'>
						<Navbar title='Github Finder' icon='fab fa-github' />
						<div className='container'>
							<Alert />
							<Switch>
								<Route exact path='/' component={Home} />
								<Route exact path='/about' component={About} />
								<Route exact path='/user/:login' component={User} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;
