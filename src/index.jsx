import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

import { CryptoContext } from './context/CryptoContext'
import { AnimateContext } from './context/AnimateContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <QueryClientProvider client={queryClient}>
    <CryptoContext>
      <AnimateContext>
        <App />
      </AnimateContext>
    </CryptoContext>
  </QueryClientProvider>
)