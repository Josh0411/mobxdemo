import React from 'react';
import { Control } from 'react-keeper';

export default class Shoe extends React.Component {
	constructor (props) {
		super(props);
		console.log('This is shoe page props', this.props);
		console.log('shoe page Control state', Control.state);
	}
	render() {
		return (
			<div>
				this is shoe Page
			</div>
		);
	}
}