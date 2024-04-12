import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from "react";



import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";

import UserIndex from "./pages/Users/UserIndex";
import PermissionIndex from "./pages/Permissions/PermissionIndex";
import RolesIndex from "./pages/Roles/RolesIndex";


function App() {


  const [isLoggedIn, setisLoggedIn] = useState('');

  useEffect(() => {
    // Lee el valor almacenado en localStorage
    const authenticated = localStorage.getItem("isLoggedIn");

    // Comprueba si el valor existe y no está vacío
    //if (authenticated && authenticated === "true") {
    if (authenticated=='b326b5062b2f0e69046810717534cb09') {
      setisLoggedIn(true);
    }
  }, []);


  return (
    <>
        <BrowserRouter>
          <Routes>
            {
              isLoggedIn?
              <Route path="/" element={<Layout />}>
                
                <Route index element={<Home />} />

                <Route path='users'>
                  <Route path="list" element={<UserIndex />} />
                </Route>

                <Route path='roles'>
                  <Route path="list" element={<RolesIndex/>} />
                </Route>

                <Route path='permissions'>
                  <Route path="list" element={<PermissionIndex/>} />
                </Route>

                <Route path="contact" element={<Contact />} />

                <Route path="*" element={<NoPage />} />

              </Route>
            :
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="*" element={<Login />} />
              </Route>
            }
            
          </Routes>
            
        </BrowserRouter>
    </>
  );
}

export default App;