import React from 'react';
import {inject, observer} from 'mobx-react';
import {add,linfeng} from '@src/utils/utils';
import { Control } from 'react-keeper';
import { observable, action, extendObservable,get,set } from 'mobx';
import SubHome from './subHome/subHome';
import MiniHome from './miniHome/miniHome';


@inject('homeStore')
@observer 
export default class Home extends React.Component {

	constructor (props) {
		super(props);
		this.homeStore = this.props.homeStore;
		console.log('home page props', this.props);
		console.log('home page Control state', Control.state);
		this.state = {
			imageUrl:'',
			curTime: new Date().toString(),
			homeTitle: 'home title'
		};
		this.changeValue = this.changeValue.bind(this);
		this.do_click = this.do_click.bind(this);
		this.passFunction = this.passFunction.bind(this);
	}

	@observable width = 1009;

	@action setWidth (value) {
		this.width = value;
	}

	componentWillReact() {
		console.log('Home--componentWillReact');
	}

	componentWillMount() {
		console.log('Home--componentWillMount');
	}

	componentWillUpdate() {
		console.log('Home--componentWillUpdate');
	}

	componentWillReceiveProps() {
		// console.log('Home--componentWillReceiveProps');
	}

	changeValue() {
		this.homeStore.changeStore({
			age: 900
		});
		this.setState({
			homeTitle: 'new home title'
		});
	}

	do_click() {
		this.homeStore.updateInfo({
			name: 'new--name'
		});
	}

	passFunction(event) {
		console.log('target', event.target);
	}

	passValue = 2;

	render () {
		console.count('===Home render=====');
		return (
			<div>
			    {/*<input type="button" value="click me" onClick={this.changeValue}/>
				<div>当前年纪: {this.homeStore.ageValue}</div>
				<div>当前长度: {this.width}</div>*/}
				{/*<div>info.name: {this.homeStore.info.name}</div>*/}
				<div>首页内容,当前时间: {this.state.curTime}</div>
				<br/>
				<br/>
				<MiniHome info={this.homeStore.info}/>
				<br/>
				<br/>
				<input type="button" value="改变" onClick={this.do_click}/>
			</div>
		);
	}

}