import React from 'react';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList';

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <strong>
          <span>2.</span> {props.question}
        </strong>

        <small>4 из 12</small>
      </p>

      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
    </div>
  );
};

export default ActiveQuiz;
