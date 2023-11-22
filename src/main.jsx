import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import "./style/style.css"
import "./style/modal.css"
import "./style/article.css"
import App from './App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
        <ToastContainer/>
    </BrowserRouter>
)

