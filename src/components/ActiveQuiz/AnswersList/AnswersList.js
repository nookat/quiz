import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem';

const AnswersList = props => {
  return (
    <ul className={classes.AnswersList}>
      {
        props.answers.map((answer, idx) => {
          return (
            <AnswerItem key={`${answer}${Math.random()}`} answer={answer}/>
          );
        })
      }
    </ul>
  );
};

export default AnswersList;
