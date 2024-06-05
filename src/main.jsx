import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
