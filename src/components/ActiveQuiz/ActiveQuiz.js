import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList';

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <strong>
          <span>{props.answerNumber}.</span> {props.question}
        </strong>

        <small>{props.answerNumber} из {props.quizLength}</small>
      </p>

      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
      />
    </div>
  );
};

export default ActiveQuiz;
