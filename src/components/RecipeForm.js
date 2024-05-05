import React, { useState } from 'react';
import '../styles/partials/recipesStyles.scss';

export default function RecipeForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill out all fields.');
      return;
    }
    
    const ingredientsArray = ingredients.split('\n').map(item => item.trim());
    const instructionsArray = instructions.split('\n').map(item => item.trim());
  
    onSubmit({ name, ingredients: ingredientsArray, instructions: instructionsArray });
    setName('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <div>
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
}
