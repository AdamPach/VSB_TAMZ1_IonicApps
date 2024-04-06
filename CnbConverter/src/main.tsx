import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CurrenciesContextProvider from "./contexts/CurrenciesContext";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <CurrenciesContextProvider>
        <App />
    </CurrenciesContextProvider>
  </React.StrictMode>
);