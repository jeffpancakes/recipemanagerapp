import React from 'react';
import { useUser } from '../components/UserContext';
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user } = useUser();

  if (!user || user.isAdmin) {
    return <Navigate to="/home" />;
  }

  return <div>This is User Dashboard. TBA</div>;
};

export default UserDashboard;