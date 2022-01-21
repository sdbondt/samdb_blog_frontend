import React, { useRef } from 'react'

const LoginForm = (props) => {
    const { setToken, setIsLoggedIn, setUser, setError } = props
    const emailRef = useRef()
    const passwordRef = useRef()

    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const loginBody = JSON.stringify({
                email: emailRef.current.value , password: passwordRef.current.value
            })
    
            const responseData = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                body: loginBody,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const data = await responseData.json()
            if (!data.user || !data.token) {
                throw new Error(data.msg)
            }
            const { token, user } = data
            setToken(token)
            setIsLoggedIn(true)
            setUser(user)
            localStorage.setItem('userdata', JSON.stringify({ user, token }))
        } catch (e) {
            setError(e.msg || 'Something went wrong.')
        }
        
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email</label><br />
                <input type="email" id="email" ref={emailRef} /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" id="password" ref={passwordRef} /><br />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
