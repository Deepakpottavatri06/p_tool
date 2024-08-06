import React from 'react'

import NavbarSimple from './components/NavbarSimple'
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import {useState} from 'react';
import TodoList from './components/TodoList';
const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
      <>
      <NavbarSimple isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login logset={setIsAuthenticated} />} />
              <Route
                  path="/todos"
                  element={
                      <PrivateRoute isAuthenticated={isAuthenticated}>
                          <TodoList />
                      </PrivateRoute>
                  }
              />
          </Routes>
      </div>
      </>
  );
}
