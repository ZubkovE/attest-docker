import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes } from './app/api/router'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../src/shared/utils/store.ts'
import AuthProvider from './app/api/providers/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  </Provider>
  //</StrictMode>
)
