import React from "react"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useAuthentication } from "./contexts/AuthContext"

import Login from "./pages/Login"
import Layout from './pages/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NoPage from './pages/NoPage';

import UserIndex from './pages/Users/UserIndex'
import PermissionIndex from "./pages/Permissions/PermissionIndex";
import RolesIndex from "./pages/Roles/RolesIndex";

function App() {
  const { isLoggedIn } = useAuthentication();

  return (
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
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
          ) : (
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="*" element={<Login/>} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
  );
}

export default App