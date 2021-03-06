import './../styles/style.css';
import React from 'react';

export default class TimedQuiz extends React.Component {
	constructor(props) {
		super(props);

		let totalLength = props.sher.words.length;

		let randomPos = Math.floor(Math.random() * (totalLength - 10));
		let randomizedWords = props.sher.words.slice(randomPos, randomPos + 10);

		randomizedWords = randomizedWords.map((w, i) => {
			let isTest = i < 3 ? true : false;

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
			workingSher: randomizedWords,
			taps: 0,
			incorrectAnswers: 0,
			finished: false,
			nextWord: {
				index: firstWordIndex,
				word: firstWord
			}
		};

		function mappedCheck(ch1, ch2): boolean {
			if (ch1 == ch2 || (ch1 == 'آ' && ch2 == 'ا') || (ch1 == 'ا' && ch2 == 'آ')) return true;
			return false;
		}

		document.body.onkeyup = (e) => {
			if (!this.state.finished && accepted_keys.includes(e.key)) {
				let curWords = this.state.workingSher;
				const index = this.state.nextWord.index;
				let finished = false;
				let incorrectAnswers = this.state.incorrectAnswers;

				curWords[index].visible = true;

				if (mappedCheck(e.key, this.state.nextWord.word[0])) {
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
