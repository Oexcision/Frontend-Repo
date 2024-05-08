// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [permissionsOfUser, setPermissionsOfUser] = useState(null);

  const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

  // Al cargar la aplicación, verifica si hay un estado de autenticación guardado en localStorage
  useEffect(() => {
    const authenticated = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");
    if (authenticated === "true" && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (username, password, onSuccess, onError) => {
    try {
      const form_data = new FormData()
      form_data.append("username", username)
      form_data.append("password", password)

      const response = await axios.post(`${apiUrl}/login`, form_data);
      onSuccess();
      setTimeout(() => {
        setIsLoggedIn(true);
        setUser( response.data.user );
        setPermissionsOfUser( response.data.user.roles[0].permissions );
        //console.log(response.data.roles[0].permissions);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify( response.data.user ));
        localStorage.setItem("access_token", response.data.access_token );
        localStorage.setItem("token_type", response.data.token_type );
      }, 3000);

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      onError();
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
  };

  const refreshPermissions = async () => {
    try {
        const response = await axios.get(`${apiUrl}/users/${user.id}`, {
          headers: {
            Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
          }
         });
        //console.log(response.data.roles[0].permissions);
        setUser( response.data );
        localStorage.setItem("user", JSON.stringify( response.data ));
        setPermissionsOfUser( response.data.roles[0].permissions );
    }
    catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, permissionsOfUser, refreshPermissions }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthentication must be used within an AuthProvider");
  }
  return context;
};
