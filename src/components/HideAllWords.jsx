import './../styles/style.css';
import React from 'react';

export default class HideAllWords extends React.Component {
	constructor(props) {
		super(props);

		let randomizedWords = props.sher.words.split(' ').map((w) => {
			let isTest = false;

			return {
				word: w,
				visible: isTest,
				test: isTest,
				correct: false
			};
		});

		let firstWord = '';
		let firstWordIndex = -1;

		for (let i = 0; i < randomizedWords.length; i++) {
			if (!randomizedWords[i].visible) {
				firstWord = randomizedWords[i].word;
				firstWordIndex = i;

				break;
			}
		}

		this.state = {
			sherWords: this.props.sher.words,
			workingSher: randomizedWords,
			taps: 0,
			incorrectAnswers: 0,
			finished: false,
			nextWord: {
				index: firstWordIndex,
				word: firstWord
			}
		};

		document.body.onkeyup = (e) => {
			if (!this.state.finished) {
				let curWords = this.state.workingSher;
				const index = this.state.nextWord.index;
				let finished = false;
				let incorrectAnswers = this.state.incorrectAnswers;

				curWords[index].visible = true;

				if (e.key == this.state.nextWord.word[0]) {
					curWords[index].correct = true;
				} else {
					curWords[index].correct = false;
					incorrectAnswers++;
				}

				let nextWord = '';
				let nextWordIndex = -1;

				for (let i = 0; i < curWords.length; i++) {
					if (!curWords[i].visible) {
						nextWord = curWords[i].word;
						nextWordIndex = i;

						break;
					}
				}

				if (nextWordIndex == -1) finished = true;

				this.setState({
					workingSher: curWords,
					finished: finished,
					incorrectAnswers: incorrectAnswers,
					nextWord: {
						index: nextWordIndex,
						word: nextWord
					}
				});
			}

			this.renderWithTaps = this.renderWithTaps.bind(this);
			this.resetTaps = this.resetTaps.bind(this);
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.sher.words != prevState.sherWords) {
			let randomizedWords = nextProps.sher.words.split(' ').map((w) => {
				let isTest = false;

				return {
					word: w,
					visible: isTest,
					test: isTest,
					correct: false
				};
			});

			let firstWord = '';
			let firstWordIndex = -1;

			for (let i = 0; i < randomizedWords.length; i++) {
				if (!randomizedWords[i].visible) {
					firstWord = randomizedWords[i].word;
					firstWordIndex = i;

					break;
				}
			}

			return {
				sherWords: nextProps.sher.words,
				workingSher: randomizedWords,
				taps: 0,
				incorrectAnswers: 0,
				finished: false,
				nextWord: {
					index: firstWordIndex,
					word: firstWord
				}
			};
		}
	}

	resetTaps() {
		this.setState({ taps: 0 });
	}

	renderWithTaps() {
		return (
			<div>
				{this.state.workingSher.map((word) => {
					if (word.visible) {
						if (word.test) return <span>{word.word} </span>;
						else {
							if (word.correct) return <span className="green-text">{word.word} </span>;
							else return <span className="red-text">{word.word} </span>;
						}
					} else return <span>{'_'.repeat(5)} </span>;
				})}
			</div>
		);
	}

	render() {
		return (
			<div>
				<div className="level-container">
					<p>امتیاز {this.state.incorrectAnswers}</p>
					<p>کلمات بعدی را حدس بزنید و حرف اول آنها را وارد کنید:</p>

					<div className="sher-container">{this.renderWithTaps()}</div>
				</div>
			</div>
		);
	}
}
