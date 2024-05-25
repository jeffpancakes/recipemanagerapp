import React from 'react';
import { useUser } from '../components/UserContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useUser();

  if (!user || !user.isAdmin) {
    return <Navigate to="/home" />;
  }

  return <div>Admin Dashboard</div>;
};

export default AdminDashboard;