import React, { useState } from 'react'
import ShowError from './ShowError'
const ErrorContext = React.createContext({})
// const ErrorProvider = ErrorContext.Provider
export default ErrorContext

export const ErrorProvider = props => {
    const { children } = props
    const [error, setError] = useState({})
    const showError = (title, error) => {
        setError({
            show: true,
            title,
            msg: error.message
        })
    }
    return (
        <ErrorContext.Provider value={{ showError }} >
            {children}
            <ShowError error={error} onClose={() => setError({ show: false })} />
        </ErrorContext.Provider>
    )
}

