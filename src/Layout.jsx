import './styles/layout.css';

import React from 'react';
import RevealNextWord from './components/RevealNextWord.jsx';
import RandomlyHideWords from './components/RandomlyHideWords.jsx';
import HideAllWords from './components/HideAllWords.jsx';
import GuessNextWords from './components/GuessNextWords.jsx';
import TypeEverything from './components/TypeEverything.jsx';
import SelectPoem from './components/SelectPoem.jsx';
import SelectQuestion from './components/SelectQuestion.jsx';

var khayyam = require('./data/khayyam.json');

const QuestionTypes = Object.freeze({
	RevealNextWord: 1,
	RandomlyHideWords: 2,
	HideAllWords: 3,
	GuessNextWords: 4,
	TypeAllLetters: 5
});

export default class Layout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			poemsCount: khayyam.poems.length,
			selectedPoemIndex: 0,
			poems: khayyam.poems,
			selectedQuestionType: QuestionTypes.RevealNextWord
		};

		this.renderQuestion.bind(this);
		this.renderQuestionTypeSelector.bind(this);
	}

	renderQuestion() {
		let selectedPoem = this.state.poems[this.state.selectedPoemIndex];

		switch (this.state.selectedQuestionType) {
			case QuestionTypes.RevealNextWord:
				return <RevealNextWord sher={selectedPoem} />;

			case QuestionTypes.RandomlyHideWords:
				return <RandomlyHideWords sher={selectedPoem} />;

			case QuestionTypes.HideAllWords:
				return <HideAllWords sher={selectedPoem} />;

			case QuestionTypes.GuessNextWords:
				return <GuessNextWords sher={selectedPoem} />;

			case QuestionTypes.TypeAllLetters:
				return <TypeEverything sher={selectedPoem} />;
		}
	}

	renderQuestionTypeSelector() {
		const keys = Object.keys(QuestionTypes);
		const values = Object.values(QuestionTypes);

		return (
			<div>
				{keys.map((key, i) => {
					return (
						<SelectQuestion
							text={key}
							selected={this.state.selectedQuestionType == values[i]}
							updateQuestion={() => {
								this.setState({ selectedQuestionType: values[i] });
							}}
						/>
					);
				})}
			</div>
		);
	}

	render() {
		return (
			<div>
				<div>{this.renderQuestion()}</div>

				<div className="bottom">
					<br />
					<div>
						{this.state.poems.map((p, i) => {
							return (
								<SelectPoem
									text={i + 1}
									selected={this.state.selectedPoemIndex == i}
									updatePoem={() => {
										this.setState({ selectedPoemIndex: i });
									}}
								/>
							);
						})}
					</div>
					<br />
					<div>{this.renderQuestionTypeSelector()}</div>
					<br />
				</div>
			</div>
		);
	}
}
