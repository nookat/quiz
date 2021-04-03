import React from 'react';
import classes from './AnswersList.module.css';
import AnswerItem from './AnswerItem';

const AnswersList = props => {
  return (
    <ul className={classes.AnswersList}>
      {
        props.answers.map(answer => {
          return (
            <AnswerItem
              key={answer.id}
              answer={answer}
              onAnswerClick={props.onAnswerClick}
              state={props.state ? props.state[answer.id] : null}
            />
          );
        })
      }
    </ul>
  );
};

export default AnswersList;
