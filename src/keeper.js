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

// import DevTools from 'mobx-react-devtools';


// spy((event) => {
//     if (event.type === 'action') {
//         console.log(`${event.name} with args:`, event.arguments)
//     }
// })

class App extends React.Component {
	enterCategory(cb) {
		console.log('====enterCategory====');
		cb();
	}
	render () {
		return (
			<Provider {...store}>
		        <HashRouter>
					<div>
						<div className="nav">
							<ul>
								<li>
									<Link tyle="img" src="./images/1.png" to="/home">首页</Link>
								</li>
								<li>
									<Link to="/category">分类</Link>
								</li>
							</ul>
						</div>
						<div className="content">
							<Route index cache path="/home" component={Home} />
							<Route path="/category" enterFilter={this.enterCategory} loadComponent={(cb)=> {
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


// 只有当开启了模块热替换时 module.hot 才存在
if (module.hot) {
  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./AppComponent 这个子模块
  // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
  module.hot.accept(['./section/home/home'], () => {
    // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
    ReactDOM.render(<App/>, document.getElementById('app'));
  });
}



ReactDOM.render(<App/>, document.getElementById('app'));
