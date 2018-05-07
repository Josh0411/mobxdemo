import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { NavLink, HashRouter, Router, Route, indexRoute, Switch, Redirect } from 'react-router-dom';
import { autorun, spy } from 'mobx';
import Home from './src_router/home/home';
import Products from './src_router/Products/Products';
import store from '@src/store';
import 'babel-polyfill';

class App extends React.Component {
	render () {
		return (
			<Provider {...store}>
		        <HashRouter>
					<div>
						<div className="nav">
							<ul>
								<li>
									<NavLink to="/home">首页</NavLink>
								</li>
								<li>
									<NavLink to="/products">产品</NavLink>
								</li>
							</ul>
						</div>
						<div className="content">
						    <Switch>
								<Route path="/home" component={Home}/>
								<Route path="/products" component={Products}/>
								<Redirect from="/" to="/home"></Redirect>
							</Switch>
						</div>
					</div>
				</HashRouter>
			</Provider>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));







