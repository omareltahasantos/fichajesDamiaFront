import React from 'react'
import ReactDOM from 'react-dom' // Not 'react-dom/client' in React 17
import App from './App'

// This is how you render the app in React 17
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
