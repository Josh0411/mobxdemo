import React from 'react';
import {inject, observer} from 'mobx-react';
import { observable, action } from 'mobx';


@observer 
export default class MiniHome extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		console.count('===miniHome render=====');
		return (
			<div>
				<div>miniHome, {this.props.info.name}</div>
			</div>
		);
	}
}