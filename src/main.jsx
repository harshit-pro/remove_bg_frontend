import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import AppContextProvider from './context/AppContext';

// Ensure that the VITE_PUBLISHABLE_KEY is defined in your .env file
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHABLE_KEY) {
  throw new Error("VITE_PUBLISHABLE_KEY is not defined. Please set it in your .env file.");
}
ReactDOM.createRoot(document.getElementById('root')).render( 
  
  <BrowserRouter>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <AppContextProvider>
    <App />
    </AppContextProvider>
    </ClerkProvider>
  </BrowserRouter>
);