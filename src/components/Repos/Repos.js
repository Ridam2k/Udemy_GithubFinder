import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repos }) => {
	return (
		<div style={userStyle}>
			{repos.map((repo) => (
				<RepoItem repo={repo} key={repo.id} />
			))}
		</div>
	);
};
Repos.propTypes = {
	repos: PropTypes.array.isRequired,
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3,1fr)',
	gridGap: '1rem',
	textAlign: 'center',
};
export default Repos;
