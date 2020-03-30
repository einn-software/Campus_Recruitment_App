import React, { Component } from 'react';

class login extends Component {
	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit} className='form'>
					<input
						type='text'
						name='text'
						placeholder='search user...'
						value={this.state.text}
						onChange={this.onChange}></input>
					<input
						type='submit'
						value='search'
						className='btn btn-dark btn-block'></input>
				</form>
				{showClear && (
					<button
						onClick={clearUsers}
						className='btn btn-block btn-light'>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default login;
