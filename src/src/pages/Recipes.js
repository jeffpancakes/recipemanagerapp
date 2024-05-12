import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeForm from '../components/RecipeForm';
import '../styles/partials/recipesStyles.css'; // Import your CSS file here

export default function Recipes() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(`https://api.edamam.com/search?q=pancakes&app_id=a75e74ab&app_key=23c72b2b0e7355aab22225b85d1f3a2a`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.hits.map(hit => hit.recipe));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

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
    setRecipes([...recipes, newRecipe]);
    toggleForm();
  };
  
  const handleDelete = (recipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
  };

  return (
    <div>
      <h1>All Recipes</h1>
      <button className="create-recipe-button" onClick={toggleForm}>Create New Recipe</button>
      {showForm && <RecipeForm onSubmit={handleFormSubmit} />}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h2>{recipe.label}</h2>
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.text}</li>
                ))}
              </ul>
              {/* <h3>Instructions:</h3>
              <ol>
                {recipe.ingredientLines && recipe.ingredientLines.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol> */}
              <a href="https://smittenkitchen.com/recipes/" target="_blank" rel="noopener noreferrer">
                <button className="instructions-button">Instructions</button>
              </a>
              {recipe.newlyCreated && (
                <button className="delete-button" onClick={() => handleDelete(recipe.id)}>Delete</button>
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
