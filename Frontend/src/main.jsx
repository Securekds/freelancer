import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { LanguageProvider } from './components/hero/LanguageContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <LanguageProvider>
   
      <App />

    </LanguageProvider>
  </React.StrictMode>
);
