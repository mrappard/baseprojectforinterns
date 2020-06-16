import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SecondPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			object: ''
		};
	}

	componentDidMount() {
		
	}

	render() {
		return(
			<div className='container'>
				<h1> Hello world!</h1>
				<button><Link to="/">Back to Landing page</Link></button>
			</div>
		);
	}
}

export default SecondPage;