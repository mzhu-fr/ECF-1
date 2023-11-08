// IMPORT MODULES
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// IMPORT FILES
import App from './App';
import { AuthContextProvider } from './context/AuthentificationContext';
import Store from './redux-store/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Provider store={Store}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Provider>


  </React.StrictMode >
);