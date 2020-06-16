import React from 'react';
import { HashRouter as Router} from 'react-router-dom';
import { Main } from './containers/';
import { render } from 'react-dom';

render((
	<Router>
		<Main />
	</Router>),
	document.getElementById('root'));