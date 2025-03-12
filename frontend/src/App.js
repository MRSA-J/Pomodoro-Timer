import React, { useEffect } from "react";
import Timer from "./components/Timer";
import { useAppContext } from "./AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./components/LogOut";
import axios from "axios";
import "./App.css";

function App() {
  const { setUser, setHistory } = useAppContext();
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user: auth0User,
  } = useAuth0();

  useEffect(() => {
    console.log("isLoading", isLoading);
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      } else {
        // Set the user in the context
        setUser(auth0User);

        // Check if the user is registered in the database
        axios
          .get(
            process.env.REACT_APP_BACKEND_URL + "/api/auth/is_user_registered",
            {
              params: { email: auth0User.email },
            }
          )
          .then((response) => {
            if (response.data) {
              console.log("User is registered");
            } else {
              console.log("User is not registered");
              axios
                .post(
                  process.env.REACT_APP_BACKEND_URL + "/api/auth/register_user",
                  {
                    email: auth0User.email,
                    name: auth0User.name,
                    created_at: Date.now(),
                  }
                )
                .then((response) => {
                  console.log("User registered");
                })
                .catch((error) => {
                  console.error("Error registering user:", error);
                });
            }
          })
          .catch((error) => {
            console.error("Error fetching user:", error);
          });
        console.log("auth0User", auth0User);

        // Fetch the user history from the database
        axios
          .get(
            process.env.REACT_APP_BACKEND_URL + "/api/session/get_user_history",
            {
              params: { email: auth0User.email },
            }
          )
          .then((response) => {
            setHistory(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user history:", error);
          });
      }
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="app-container">
      <Timer />
      {isAuthenticated && <LogoutButton />}
    </div>
    // <History />
  );
}

export default App;
