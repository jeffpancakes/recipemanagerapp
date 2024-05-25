import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Footer from "./components/Footer";

import Home from './pages/Home';
import Recipes from './pages/Recipes';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

import RecipeListProvider from "./components/RecipeListProvider";
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className='container main'>
          <RecipeListProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
          </RecipeListProvider>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;