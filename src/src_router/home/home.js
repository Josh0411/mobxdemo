import React from 'react';
import './style/home.scss';

export default class Home extends React.Component {

	constructor (props) {
		super(props);
		console.log('products--props', this.props);
		this.doClick = this.doClick.bind(this);
	}

	doClick() {
		this.props.history.push({pathname:'/products/1', state:{name:"home"}});
	}

    render () {
		return (
			<div>
				<input type="button" value="跳转" onClick={this.doClick}/>
			</div>
		);
	}

}
