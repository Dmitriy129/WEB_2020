import React, { useState, useContext } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, LinearProgress } from '@material-ui/core';
import { observer, inject } from 'mobx-react';
import InputsList from './InputsList'
import ButtonsList from './ButtonsList'
import ErrorContext from '../Errors/ErrorContext'
import { confirmSignUp, resendConfirmationCode, resendForgotPasswordCode, forgotPasswordSubmit, completeNewPassword } from '../../src/api/auth'



const useStyle = makeStyles((theme) => {
    return {
        root: {
            width: "100vw",
            height: "100vh",
        },
        input: {
            padding: theme.spacing(1)
        },
        btn: {
            margin: theme.spacing(0.5)
        }

    };
});


const passwordRules = [(v) => !!v || "Введите пароль"]
const emailRules = [(v) => !!v || "Введите почту"]
const codeRules = [(v) => !!v || "Введите код подтверждения"]
const nameRules = [(v) => !!v || "Введите имя"]
const family_nameRules = [(v) => !!v || "Введите фамилию"]
const phone_numberRules = [(v) => !!v || "Введите телфон"]
const sexRules = [(v) => !!v || "Введите пол"]
const typeRules = [(v) => !!v || "Введите тип пользователя"]


const AuthManager = (props) => {
    const router = useRouter()
    const { showError } = useContext(ErrorContext)
    const [state, setState] = useState({})
    const [valid, setValid] = useState(true)
    const [formError, setFormError] = useState(false)
    const [authStep, setAuthStep] = useState(3)
    const { setLoading, user: { signIn } } = props

    const classes = useStyle();
    const handleChange = (setter, newValue) => {
        setValid(true)
        setFormError(false)
        setter(newValue)
    }
    const gotToStep = (step) => {
        setState({})
        setValid(true)
        setFormError(false)
        setAuthStep(step)
    }

    const checkInputValidation = (value, rules) => {
        const a = rules.map(e => e(value)).filter(e => e !== true)[0] || ' '
        return a
    }

    const checkFormValidation = (arr) => {
        const newValid = [
            { name: "password", value: state.password, rules: passwordRules },
            { name: "code", value: state.code, rules: codeRules },
            { name: "email", value: state.email, rules: emailRules },
            { name: "sex", value: state.sex, rules: sexRules },
            { name: "phone_number", value: state.phone_number, rules: phone_numberRules },
            { name: "type", value: state.type, rules: typeRules },
            { name: "name", value: state.name, rules: nameRules },
            { name: "family_name", value: state.family_name, rules: family_nameRules },
        ]
            .filter(e => arr.indexOf(e.name) !== -1)
            .map(({ value, rules }) => checkInputValidation(value, rules))
            .every(e => e === ' ')
        setValid(newValid)
        return newValid;
    }

    const trySignIn = async () => {
        console.log('signin')
        if (checkFormValidation(["email", "password"])) {
            return await signIn(state.email, state.password, state)
                .then(user => {
                    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        gotToStep(6)
                    }
                    else {
                        router.push('/')
                    }
                })
        }
    }
    const tryCompleteNewPassword = async () => {
        return await completeNewPassword(props.user.user, state.password)
    }
    const tryСonfirmSignUp = async () => {
        if (checkFormValidation(["email", "code"])) {
            return await confirmSignUp(state.email, state.code)
                .then(() => gotToStep(3))
        }
    }
    const tryResendConfirmationCode = async () => {
        if (checkFormValidation(["email"])) {
            return await resendConfirmationCode(state.email)
        }
    }
    const tryResendForgotPasswordCode = async () => {
        if (checkFormValidation(["email"])) {
            return await resendForgotPasswordCode(state.email)
                .then(() => gotToStep(5))
        }
    }
    const tryForgotPasswordSubmit = async () => {
        if (checkFormValidation(["email", "code", "password"])) {
            return await forgotPasswordSubmit(state.email, state.code, state.password)
                .then(() => gotToStep(3))
        }
    }
    const tryFormAction = async (cb) => {
        setLoading(true)
        cb()
            .catch(e => showError(e.name, e))
            .then(() => setLoading(false))
    }

    return (
        <>
            {authStep === 2 &&
                <>
                    <Typography>Подтверждение аккаунта</Typography>
                    <InputsList
                        formValid={valid}
                        handleChange={handleChange}
                        list={[
                            { name: "Почта", value: state.email, setter: (email) => setState(prevState => ({ ...prevState, email })), valueValid: checkInputValidation(state.email, emailRules), type: "email" },
                            { name: "Код подтверждения", value: state.code, setter: (code) => setState(prevState => ({ ...prevState, code })), valueValid: checkInputValidation(state.code, codeRules) },

                        ]}
                    />
                    <ButtonsList
                        list={[
                            { text: "Подтвердить аккаунт", onClick: () => tryFormAction(tryСonfirmSignUp), active: true },
                            { text: "Выслать код повторно", onClick: () => tryFormAction(tryResendConfirmationCode), active: true },
                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на вход", onClick: () => gotToStep(3) },
                        ]} />
                </>
            }
            {authStep === 3 &&
                <>
                    <Typography>Вход в систему</Typography>
                    <InputsList
                        formValid={valid}
                        handleChange={handleChange}
                        list={[
                            { name: "Почта", value: state.email, setter: (email) => setState(prevState => ({ ...prevState, email })), valueValid: checkInputValidation(state.email, emailRules), type: "email" },
                            { name: "Пароль", value: state.password, setter: (password) => setState(prevState => ({ ...prevState, password })), valueValid: checkInputValidation(state.password, passwordRules), type: "password" },
                        ]}
                    />
                    <ButtonsList
                        list={[
                            { text: "Вход", onClick: () => tryFormAction(trySignIn), active: true },
                        ]} />
                    <ButtonsList
                        list={[
                            { text: "восстановить пароль?", onClick: () => gotToStep(4) },
                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на подтверждение акканта", onClick: () => gotToStep(2) },
                        ]} />
                </>
            }
            {authStep === 4 &&
                <>
                    <Typography>Восстановить пароль</Typography>
                    <InputsList
                        formValid={valid}
                        handleChange={handleChange}
                        list={[
                            { name: "Почта", value: state.email, setter: (email) => setState(prevState => ({ ...prevState, email })), valueValid: checkInputValidation(state.email, emailRules), type: "email" },
                        ]}
                    />
                    <ButtonsList
                        list={[
                            { text: "выслать код ", onClick: () => tryFormAction(tryResendForgotPasswordCode), active: true },

                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на вход", onClick: () => gotToStep(3) },

                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на подтверждение акканта", onClick: () => gotToStep(2) },

                        ]} />
                </>
            }
            {authStep === 5 &&
                <>
                    <Typography>Восстановить пароль</Typography>
                    <InputsList
                        formValid={valid}
                        handleChange={handleChange}
                        list={[
                            { name: "Почта", value: state.email, setter: (email) => setState(prevState => ({ ...prevState, email })), valueValid: checkInputValidation(state.email, emailRules), type: "email" },
                            { name: "Новый пароль", value: state.password, setter: (password) => setState(prevState => ({ ...prevState, password })), valueValid: checkInputValidation(state.password, passwordRules), type: "password" },
                            { name: "Код подтверждения", value: state.code, setter: (code) => setState(prevState => ({ ...prevState, code })), valueValid: checkInputValidation(state.code, codeRules) },
                        ]}
                    />
                    <ButtonsList
                        list={[
                            { text: "Заменить пароль", onClick: () => tryFormAction(tryForgotPasswordSubmit), active: true },

                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на вход", onClick: () => gotToStep(3) },

                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на подтверждение акканта", onClick: () => gotToStep(2) },

                        ]} />
                </>
            }
            {authStep === 6 &&
                <>
                    <Typography>Подтвердить новый пароль</Typography>
                    <InputsList
                        formValid={valid}
                        handleChange={handleChange}
                        list={[
                            // { name: "Почта", value: state.email, setter: (email) => setState(prevState => ({ ...prevState, email })), valueValid: checkInputValidation(state.email, emailRules), type: "email" },
                            { name: "Новый пароль", value: state.password, setter: (password) => setState(prevState => ({ ...prevState, password })), valueValid: checkInputValidation(state.password, passwordRules), type: "password" },
                        ]}
                    />
                    <ButtonsList
                        list={[
                            { text: "Подтвердить", onClick: () => tryFormAction(tryCompleteNewPassword), active: true },
                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на вход", onClick: () => gotToStep(3) },
                        ]} />
                    <ButtonsList
                        list={[
                            { text: "на подтверждение акканта", onClick: () => gotToStep(2) },
                        ]} />
                </>
            }
            {formError &&
                <Typography variant="caption" color="error">
                    {formError}
                </Typography>}
        </>
    );
}



export default inject("user")(observer(AuthManager))