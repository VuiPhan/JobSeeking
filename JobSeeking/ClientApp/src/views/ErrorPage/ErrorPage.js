import React from 'react'

function ErrorPage() {
    const StylePageError = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
    return (
        <div style={StylePageError}>
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
        </div>
    )
}

export default ErrorPage
