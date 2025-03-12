import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '../AppContext';
const LogoutButton = () => {
    const { logout } = useAuth0();
    const { setUser, setHistory } = useAppContext();
  
    return (
        <button onClick={() => {
            logout({ returnTo: window.location.origin })
            setUser(null);
            setHistory([]);
        }}>
            Log Out
        </button>
    );
  };

export default LogoutButton;