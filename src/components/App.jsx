import Contacts from 'pages/Contacts/Contacts';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Login from 'pages/Login/Login';
import { PrivateRoute } from 'HOC/PrivateRoute';
import { PublicRoute } from 'HOC/PublicRoute';
import SignUp from 'pages/SignUp/SignUp';
import { useSelector } from 'react-redux';
import { selectIsOnline } from 'redux/Auth/authSelectors';

export const App = () => {
  const isOnline = useSelector(selectIsOnline);

  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route path="*" element={isOnline ? <Contacts /> : <Login />} />
      </Routes>
    </>
  );
};
