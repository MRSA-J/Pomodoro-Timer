import React, { useEffect } from 'react';
import Timer from './components/Timer';
import History from './components/History'; 
import { useAppContext } from './AppContext';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
      </button>
  );
};

function App() {
  const { setUser } = useAppContext();
  const { isAuthenticated, isLoading, loginWithRedirect, user:auth0User } = useAuth0()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      } else {
        setUser(auth0User);
        axios.get(process.env.REACT_APP_BACKEND_URL + '/api/auth/is_user_registered', {
          params: { email: auth0User.email }
        })
        .then(response => {
          if (response.data) {
            console.log('User is registered');
          } else {
            console.log('User is not registered');
            axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/register_user', {
              email: auth0User.email,
              name: auth0User.name,
              created_at: Date.now()
            })
            .then(response => {
              console.log(response.data);
              console.log('User registered');
            })
            .catch(error => {
              console.error('Error registering user:', error);
            });
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
      }
    }
  }, [isAuthenticated]);

  return (
    <div>
      <Timer />
      <LogoutButton />
    </div>
      // <History />
  );
}

export default App;