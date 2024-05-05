import React, { useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import '../styles/partials/recipesStyles.scss';
import defaultRecipes from '../components/defaultRecipes';

export default function Recipes() {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState(defaultRecipes);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleFormSubmit = (formData) => {
    const newRecipe = {
      id: recipes.length + 1,
      ...formData
    };
    setRecipes([...recipes, newRecipe]);
    toggleForm();
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  return (
    <div>
      <h1>All Recipes</h1>
      <button className="create-recipe-button" onClick={toggleForm}>Create New Recipe</button>
      {showForm && <RecipeForm onSubmit={handleFormSubmit} />}
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h2>{recipe.name}</h2>
            {/* Conditionally render delete button */}
            {!defaultRecipes.some(defaultRecipe => defaultRecipe.id === recipe.id) && (
              <button className="delete-button" onClick={() => handleDeleteRecipe(recipe.id)}>Delete</button>
            )}
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
