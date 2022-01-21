import React from 'react'

const ErrorDisplay = ({ error, setError }) => {
    const clickHandler = () => {
        setError(false)
    }

    return (
        <div>
            <p>{error}</p><br />
            <button onClick={clickHandler}>Go back.</button>
        </div>
    )
}

export default ErrorDisplay
