import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    // Get the user from the 'auth' slice of your Redux store
    const { user } = useSelector(store => store.auth);

    if (!user) {
        // If there is no user, redirect to the login page
        return <Navigate to="/login" />;
    }

    // If there is a user, show the protected page
    return children;
};

export default ProtectedRoutes;