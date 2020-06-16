import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landingpage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			object: ''
		};
	}
	componentDidUpdate(prevProps) {
		// will be true
		if (prevProps.location !== this.props.location)
			history.pushState(prevProps.location);
	}

	componentDidMount() {

	}

	render() {
		return(
			<div className='container'>
				<h1> Kiran Ahmed</h1>
				<button><Link to="/secondPage">Second Page</Link></button>
			</div>
		);
	}
}

export default Landingpage;