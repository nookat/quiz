import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: 'Какой язык программирования активен во Frontend?',
        rightAnswerId: 3,
        answers: [
          {id: 1, text: 'Java'},
          {id: 2, text: 'PHP'},
          {id: 3, text: 'Javascript'},
          {id: 4, text: 'Python'},
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    console.log('AnswerId:', answerId);
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
