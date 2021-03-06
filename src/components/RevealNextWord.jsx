import './../styles/style.css';
import React from 'react';

export default class RevealNextWord extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sherWords: this.props.sher.words,
			workingSher: props.sher.words.split(' '),
			taps: 0
		};

		document.body.onkeyup = (e) => {
			this.setState({ taps: this.state.taps + 1 });
		};

		this.renderWithTaps = this.renderWithTaps.bind(this);
		this.resetTaps = this.resetTaps.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.sher.words != prevState.sherWords) {
			return {
				sherWords: nextProps.sher.words,
				workingSher: nextProps.sher.words.split(' '),
				taps: 0
			};
		}
	}

	resetTaps() {
		this.setState({ taps: 0 });
	}

	renderWithTaps() {
		let visibleWords = this.state.workingSher.slice(0, this.state.taps);

		return visibleWords.join(' ');
	}

	render() {
		return (
			<div>
				{this.state.taps == this.state.workingSher.length ? (
					<button onClick={this.resetTaps}>Reset</button>
				) : (
					undefined
				)}

				<div className="level-container">
					<p>:با زدن روی صفحه کلمه بعدی مشخص می‌شود</p>

					<div className="sher-container">{this.renderWithTaps()}</div>
				</div>
			</div>
		);
	}
}
