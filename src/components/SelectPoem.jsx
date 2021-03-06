import './../styles/style.css';

import classNames from 'classnames/bind';
import React from 'react';

export default class SelectPoem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<button className={classNames('button', { selected: this.props.selected })} onClick={this.props.updatePoem}>
				{this.props.text}
			</button>
		);
	}
}
