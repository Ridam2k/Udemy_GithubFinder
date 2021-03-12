import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
	SEARCH_USERS,
	CLEAR_USERS,
	SET_LOADING,
	GET_REPOS,
	GET_USER,
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

//Global states(basically those defined in App.js)
const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	//Search Github users
	const searchUsers = async (text) => {
		setLoading();

		const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${githubClientId}&client_secret= 
    ${githubClientSecret}`);

		dispatch({
			type: SEARCH_USERS,
			payload: res.data.items, //CHECK
		});
	};

	//Get a single user
	const getUser = async (login) => {
		setLoading();

		const res = await axios.get(`https://api.github.com/users/${login}?client_id=
    ${githubClientId}&client_secret= 
    ${githubClientSecret}`);
		dispatch({
			type: GET_USER,
			payload: res.data,
		});
	};

	//Get a user's repos
	const getUserRepos = async (login) => {
		setLoading();

		const res = await axios.get(`https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
  client_id=${githubClientId}&client_secret= 
  ${githubClientSecret}`);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});
	};

	//Clear users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	//Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });
	//We brought SET_LOADING from types and are sending it to the reducer

	return (
		<GithubContext.Provider
			//Value: states and fucntions that we want available whenever githubContext is imported
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
