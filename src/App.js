import React, { Component, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/Users/Users';
import axios from 'axios';
import Search from './components/Users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/Pages/About';
import User from './components/Users/User';

class App extends Component {
	constructor(props) {
		super();
		this.state = {
			users: [],
			user: {}, //Empty object
			loading: false,
			alert: null,
			repos: [],
		};
	}

	async componentDidMount() {
		this.setState({ loading: true });

		const res = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret= 
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		//Response recieved so :
		this.setState({ users: res.data, loading: false });
	}

	//Search Github users
	async searchUsers(text) {
		//Received props

		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret= 
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		//Response recieved so :
		this.setState({ users: res.data.items, loading: false });
	}

	//Get a single user
	async getUser(login) {
		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/users/${login}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret= 
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ user: res.data, loading: false });
	}

	//Get a user's repos
	async getUserRepos(login) {
		this.setState({ loading: true });
		const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
  client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret= 
  ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

		this.setState({ repos: res.data, loading: false });
	}

	clearUsers() {
		this.setState({ users: [], loading: false });
	}

	setAlert(msg, type) {
		//Received props

		this.setState({ alert: { msg, type } });

		setTimeout(() => this.setState({ alert: null }), 5000);
	}

	render() {
		const { users, loading, user, repos } = this.state; //Destructuring states

		return (
			<Router>
				<div className='App'>
					<Navbar title='Github Finder' icon='fab fa-github' />
					<div className='container'>
						<Alert alert={this.state.alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(props) => (
									<Fragment>
										<Search
											searchUsers={this.searchUsers.bind(this)}
											clearUsers={this.clearUsers.bind(this)}
											showClear={users.length > 0 ? true : false}
											setAlert={this.setAlert.bind(this)}
										/>

										<Users loading={loading} users={users} />
									</Fragment>
								)}
							/>

							<Route exact path='/about' component={About} />

							<Route
								exact
								path='/user/:login'
								render={(props) => (
									<User
										{...props}
										getUser={this.getUser.bind(this)}
										getUserRepos={this.getUserRepos.bind(this)} //Passing the function
										user={user}
										repos={repos} //Passing the state
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
