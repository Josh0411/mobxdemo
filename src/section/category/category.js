import React from 'react';
import {inject, observer} from 'mobx-react';
import Shoe from './shoe/shoe';
import { Link, Route, Control } from 'react-keeper';


@inject('categoryStore') 
@observer 
export default class Category extends React.Component {

	constructor (props) {
		super(props);
		this.categoryStore = this.props.categoryStore;
		console.log('This is category page props', this.props);
		this.back = this.back.bind(this);
	}

	back() {
		Control.go('/home', { name: 'React-Keeper_00_' + new Date().toString() });
	}

	renderList () {
		return (
			<div>
			    <span onClick={this.back}>返回首页</span>
			    <br/>
			    <br/>
			    This is category page
			    <br/>
			    <br/>
			    <br/>
			    <br/>
			    子分类：
			    <br/>
			    <Link to="category/shoe/9900">鞋</Link>
			    <Route path="/shoe/:id" component={Shoe}/>
			    {/*
			      <Route path={`${this.props.match.url}/shoe`} component={Shoe}/>
			    */}
			</div>
		);
	}

	render () {
		return (
			<div className="category-section">
				{ this.renderList() }
			</div>
		);
	}

}
