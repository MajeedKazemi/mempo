import './../styles/style.css';
import React from 'react';

let accepted_keys = 'چ ج ح خ ه ع غ ف ق ث ص ض ش س ی ب ل ا ت ن م ک گ و پ د ذ ر ز آ ط ظ ژ'.split(' ');

export default class TypeEverything extends React.Component {
	constructor(props) {
		super(props);

		let randomizedLetters = Array.from(props.sher.words).map((letter) => {
			return {
				letter: letter,
				visible: false,
				correct: false
			};
		});

		let firstLetter = '';
		let firstLetterIndex = -1;

		for (let i = 0; i < randomizedLetters.length; i++) {
			if (!randomizedLetters[i].visible) {
				firstLetter = randomizedLetters[i].letter;
				firstLetterIndex = i;

				break;
			}
		}

		this.state = {
			sherWords: this.props.sher.words,
			workingSher: randomizedLetters,
			incorrectAnswers: 0,
			finished: false,
			nextLetter: {
				index: firstLetterIndex,
				letter: firstLetter
			}
		};

		// onKey events stuff:

		function mappedCheck(ch1, ch2): boolean {
			if (ch1 == ch2 || (ch1 == 'آ' && ch2 == 'ا') || (ch1 == 'ا' && ch2 == 'آ')) return true;
			return false;
		}

		document.body.onkeyup = (e) => {
			let isSpace = false;

			if (this.state.nextLetter.letter == ' ' && e.keyCode == 32) isSpace = true;

			if ((!this.state.finished && accepted_keys.includes(e.key)) || isSpace) {
				let curLetters = this.state.workingSher;
				const index = this.state.nextLetter.index;
				let finished = false;
				let incorrectAnswers = this.state.incorrectAnswers;

				curLetters[index].visible = true;

				if (isSpace || mappedCheck(e.key, this.state.nextLetter.letter)) {
					curLetters[index].correct = true;
				} else {
					curLetters[index].correct = false;
					incorrectAnswers++;
				}

				let nextLetter = '';
				let nextLetterIndex = -1;

				for (let i = 0; i < curLetters.length; i++) {
					if (!curLetters[i].visible) {
						nextLetter = curLetters[i].letter;
						nextLetterIndex = i;

						break;
					}
				}

				if (nextLetterIndex == -1) finished = true;

				this.setState({
					workingSher: curLetters,
					finished: finished,
					incorrectAnswers: incorrectAnswers,
					nextLetter: {
						index: nextLetterIndex,
						letter: nextLetter
					}
				});
			}

			this.renderWithTaps = this.renderWithTaps.bind(this);
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.sher.words != prevState.sherWords) {
			let randomizedLetters = Array.from(nextProps.sher.words).map((letter) => {
				return {
					letter: letter,
					visible: false,
					correct: false
				};
			});

			let firstLetter = '';
			let firstLetterIndex = -1;

			for (let i = 0; i < randomizedLetters.length; i++) {
				if (!randomizedLetters[i].visible) {
					firstLetter = randomizedLetters[i].letter;
					firstLetterIndex = i;

					break;
				}
			}

			return {
				sherWords: nextProps.sher.words,
				workingSher: randomizedLetters,
				incorrectAnswers: 0,
				finished: false,
				nextLetter: {
					index: firstLetterIndex,
					letter: firstLetter
				}
			};
		}
	}

	renderWithTaps() {
		return (
			<div>
				{this.state.workingSher.map((letter) => {
					if (letter.visible) {
						if (letter.correct) return <span className="green-text">{letter.letter}</span>;
						else return <span className="red-text">{letter.letter}</span>;
					} else return <span>{'_'} </span>;
				})}
			</div>
		);
	}

	render() {
		return (
			<div>
				<div className="level-container">
					<p>امتیاز {this.state.incorrectAnswers}</p>
					<p>حروف بعدی را حدس بزنید و حرف اول آنها را وارد کنید:</p>

					<div className="sher-container">{this.renderWithTaps()}</div>
				</div>
			</div>
		);
	}
}
