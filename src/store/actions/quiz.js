import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(
        '/quizes.json')

      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        })
      })

      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(
        `/quizes/${quizId}.json`)

      const quiz = response.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export const quizSetState = (answerState, results) => ({ type: QUIZ_SET_STATE, answerState, results })

export const finishQuiz = () => ({ type: FINISH_QUIZ })

export const quizNextQuestion = (num) => ({
  type: QUIZ_NEXT_QUESTION,
  num
})

// Answer
export function answerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz
    const { quiz, answerState, activeQuestion, results } = state

    if (answerState) {
      const key = Object.keys(answerState)[0]
      if (answerState[key] === 'success') {
        return
      }
    }

    const question = quiz[activeQuestion]
    // const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results))

      const timeout = setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({ [answerId]: 'error' }, results))
    }
  }
}

function isQuizFinished({ activeQuestion, quiz }) {
  return activeQuestion + 1 === quiz.length
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}