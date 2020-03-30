import React from 'react';
import PropTypes from 'prop-types';

function Navbar({ tittle }) {
	return (
		<nav className='navbar bg-primary'>
			<h1>
				<i className='Home'></i> {tittle}
			</h1>
		</nav>
	);
}

Navbar.defaultProps = {
	tittle: 'Git Hub Finder'
};
//proptype check
Navbar.propTypes = {
	tittle: PropTypes.string.isRequired
};

export default Navbar;
