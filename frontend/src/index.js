import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change here
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { AppProvider } from './AppContext';
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
    >
        <AppProvider>
            <App />
        </AppProvider>
    </Auth0Provider>
);