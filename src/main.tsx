import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {store}  from './app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import { BrowserRouter } from 'react-router-dom';

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </React.StrictMode>
)
