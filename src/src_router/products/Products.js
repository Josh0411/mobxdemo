import React from 'react';
import { add, linfeng } from '@src/utils/utils';
import './style/products.scss';

export default class Products extends React.Component {

    constructor(props) {
        super(props);
        console.log('products--props', this.props);
        this.state = {
        	num: 1
        };
        this.doClick = this.doClick.bind(this);
    }

    componentWillMount() {
		console.log('Product--componentWillMount');
	}

	componentWillUpdate() {
		console.log('Product--componentWillUpdate');
	}

	componentWillReceiveProps() {
		console.log('Product--componentWillReceiveProps', this.props);
	}

	doClick() {
		this.props.history.push({
			pathname:"/products/123",
			state: {
				XXXX: 'XXXX'
			}
		});
	}

    render() {
        return (
        	<div>222
	        	<div className="num">
	        		{this.state.num}
	        	</div>
	        	<input type="button" value="点击" onClick={this.doClick}/>
            </div>
        );
    }
}
