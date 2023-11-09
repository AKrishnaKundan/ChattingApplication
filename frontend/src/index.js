import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarContent, SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
         maxSnack={1}
         anchorOrigin={{
           vertical: "bottom",
           horizontal: "center",
         }}
         preventDuplicate
      >
        <App/>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);


