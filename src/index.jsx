import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { CryptoContext } from './context/CryptoContext'
import { AnimateContext } from './context/AnimateContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CryptoContext>
    <AnimateContext>
      <App />
    </AnimateContext>
  </CryptoContext>
)