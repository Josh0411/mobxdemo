import React from 'react';
import {inject, observer} from 'mobx-react';
import { observable, action } from 'mobx';


@inject('homeStore')
@observer 
export default class SubHome extends React.Component {

	constructor (props) {
		super(props);
		this.homeStore = this.props.homeStore;
		console.log('sub home page props', this.props);
		this.state = {
			
		};
	}

	componentWillReact() {
		console.log('sub Home--componentWillReact');
	}

	componentWillMount() {
		console.log('sub Home--componentWillMount');
	}

	componentWillUpdate() {
		console.log('sub Home--componentWillUpdate');
	}

	componentWillReceiveProps() {
		console.log('sub Home--componentWillReceiveProps');
	}

	render () {
		console.count('===subHome render=====');
		return (
			<div>
				<div>subHome, title: {this.props.title}</div>
				<div>subHome, age: {this.homeStore.age}</div>
			</div>
		);
	}

}