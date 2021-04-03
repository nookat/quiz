import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // {[answerId]: 'success'/ 'error'}
    quiz: [
      {
        id: 1,
        question: 'Какой язык программирования активен во Frontend?',
        rightAnswerId: 3,
        answers: [
          {id: 1, text: 'Java'},
          {id: 2, text: 'PHP'},
          {id: 3, text: 'Javascript'},
          {id: 4, text: 'Python'},
        ],
      },
      {
        id: 1,
        question: 'Какого цвета небо?',
        rightAnswerId: 1,
        answers: [
          {id: 1, text: 'Синее'},
          {id: 2, text: 'Красное'},
          {id: 3, text: 'Желтое'},
          {id: 4, text: 'Белое'},
        ],
      },
    ],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];

    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: {[answerId]: 'success'},
      });
      const timeout = setTimeout(() => {

        if (this.isQuizFinished()) {
          console.log('Finished');
        } else {
          this.setState(prevState => {
            return {
              activeQuestion: prevState.activeQuestion + 1,
              answerState: null,
            };
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: {[answerId]: 'error'},
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>

          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
