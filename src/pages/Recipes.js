import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Route, Routes } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import EditRecipe from './EditRecipe';
import '../styles/partials/recipesStyles.css';

export default function Recipes() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const validStoredRecipes = storedRecipes.filter(recipe => recipe.label && recipe.ingredients && recipe.ingredients.length > 0);

    fetchRecipes(query, validStoredRecipes);
  }, [query]);

  async function fetchRecipes(query, validStoredRecipes) {
    try {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=a75e74ab&app_key=23c72b2b0e7355aab22225b85d1f3a2a`);
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();

      const apiRecipes = data.hits.map(hit => ({
        ...hit.recipe,
        id: uuidv4(),
      }));

      const uniqueApiRecipes = apiRecipes.filter(apiRecipe => {
        return !validStoredRecipes.some(storedRecipe => storedRecipe.label === apiRecipe.label);
      });

      const updatedRecipes = [...validStoredRecipes, ...uniqueApiRecipes];
      setRecipes(updatedRecipes);
      localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (formData) => {
    const newRecipe = {
      id: uuidv4(),
      newlyCreated: true,
      label: formData.name,
      ingredients: formData.ingredients.map((ingredient, index) => ({ text: ingredient, weight: index })),
      ingredientLines: formData.instructions
    };
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    toggleForm();
  };

  const handleDelete = (recipeId) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const handleEdit = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(searchQuery);
  };

  const filteredRecipes = recipes.filter(recipe => 
    recipe.label.toLowerCase().includes(query.toLowerCase()) || recipe.newlyCreated
  );

  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div>
            <h1>All Recipes</h1>
            <button className="create-recipe-button" onClick={toggleForm}>Create New Recipe</button>
            {showForm && <RecipeForm onSubmit={handleFormSubmit} />}
            <div className="search-container">
              <form className="search-form" onSubmit={handleSearch}>
                <input 
                  type="text" 
                  className="search-input"
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search" 
                />
                <button className="search-button" type="submit">Search</button>
              </form>
            </div>
            <div className="recipe-list">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="recipe-card">
                    <h2>{recipe.label}</h2>
                    <h3>Ingredients:</h3>
                    <ul>
                      {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.text}</li>
                      ))}
                    </ul>
                    {recipe.newlyCreated ? (
                      <div>
                        <h3>Instructions:</h3>
                        <ul>
                          {recipe.ingredientLines.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ul>
                        <button className="delete-button" onClick={() => handleDelete(recipe.id)}>Delete</button>
                        <button className="edit-button" onClick={() => handleEdit(recipe.id)}>Edit</button>
                      </div>
                    ) : (
                      <a href="https://smittenkitchen.com/recipes/" target="_blank" rel="noopener noreferrer">
                        <button className="instructions-button">Instructions</button>
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        } />
        <Route path="/edit-recipe/:id" element={<EditRecipe recipes={recipes} setRecipes={setRecipes} />} />
      </Routes>
    </div>
  );
}
