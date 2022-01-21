import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const AuthForm = ({ setError, setIsLoggedIn, setToken, setUser }) => {
    const [showRegister, setShowRegister] = useState(false)

    const switchHandler = () => {
        setShowRegister((prevState) => !prevState)
    }

    if (showRegister) {
        return <React.Fragment>
            <RegisterForm setError={setError} setIsLoggedIn={setIsLoggedIn} setToken={setToken} setUser={setUser} />
            <button onClick={switchHandler}>Show Login</button>
        </React.Fragment>
    } else {
        return (
            <div>
                <LoginForm setError={setError} setIsLoggedIn={setIsLoggedIn} setToken={setToken} setUser={setUser} />
                <button onClick={switchHandler}>Sign up instead</button>
            </div>)
    }

   
    
}

export default AuthForm
