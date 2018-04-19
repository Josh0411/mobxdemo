import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
// import { NavLink, HashRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import { autorun, spy } from 'mobx';

import Home from '@section/home/home';
import Lost from '@section/Lost/Lost';
import store from '@src/store';

import 'babel-polyfill';

import { Link, HashRouter, Route } from 'react-keeper';

import DevTools from 'mobx-react-devtools';


// spy((event) => {
//     if (event.type === 'action') {
//         console.log(`${event.name} with args:`, event.arguments)
//     }
// })



class App extends React.Component {
	render () {
		return (
			<Provider {...store}>
		        <HashRouter>
					<div>
						<div className="nav">
							<ul>
								<li>
									<Link to="/home">首页</Link>
								</li>
								<li>
									<Link to="/category">分类</Link>
								</li>
							</ul>
						</div>
						<div className="content">
							<Route index path="/home" component={Home}/>
							<Route path="/category" testname="123" loadComponent={(cb)=> {
							    import(/*webpackChunkName: "category"*/ '@section/category/category').then((Category)=>{
							      cb(Category.default)
							    })
							}} />
							<Route miss path="/404" component={Lost}/>
						</div>
						
					</div>
				</HashRouter>
			</Provider>
		);
	}
}




ReactDOM.render(<App/>, document.getElementById('app'));
