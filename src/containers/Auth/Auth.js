import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  }

  loginHandler = () => {
    const { email, password } = this.state.formControls
    this.props.auth(email.value, password.value, true)

    // try {
    //   const response = await axios.post(
    //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeAqJyobtNmACAunnxcXWR5I_6NwvCli8',
    //     authData)
    //   console.log(response.data)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  registerHandler = () => {
    const { email, password } = this.state.formControls
    this.props.auth(email.value, password.value, false)
    // const authData = {
    //   email: this.state.formControls.email.value,
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true,
    // }
    //
    // try {
    //   const response = await axios.post(
    //     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeAqJyobtNmACAunnxcXWR5I_6NwvCli8',
    //     authData)
    //   console.log(response.data)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls,
      isFormValid,
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form className={classes.AuthForm} onSubmit={this.submitHandler}>

            {this.renderInputs()}

            <Button
              type="success"
              onClickHandler={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button
              type="primary"
              onClickHandler={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    auth: (email, password, isLogin) => { dispatch(auth(email, password, isLogin)) }
  })
)(Auth)
