import React, { useState, useEffect } from 'react';
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
import EditRecipe from './pages/EditRecipe';
import CreateRecipe from './pages/CreateRecipe'; // Import CreateRecipe

import RecipeListProvider from "./components/RecipeListProvider";
import { UserProvider } from './components/UserContext';

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  const updateRecipe = (updatedRecipe) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const addRecipe = (newRecipe) => {
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

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
              <Route path="/edit-recipe/:id" element={<EditRecipe recipes={recipes} updateRecipe={updateRecipe} />} />
              <Route path="/create-recipe" element={<CreateRecipe addRecipe={addRecipe} />} /> {/* Add the CreateRecipe route */}
            </Routes>
          </RecipeListProvider>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
