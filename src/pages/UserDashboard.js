import React from 'react';
import { useUser } from '../components/UserContext';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useUser();

  if (!user || user.isAdmin) {
    return <Navigate to="/home" />;
  }

  return <div>User Dashboard</div>;
};

export default UserDashboard;