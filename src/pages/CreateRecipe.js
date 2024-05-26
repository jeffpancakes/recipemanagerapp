import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/partials/recipesStyles.css';

const CreateRecipe = ({ addRecipe }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const ingredientsArray = ingredients.split('\n').map((item) => item.trim());
    const instructionsArray = instructions.split('\n').map((item) => item.trim());

    const newRecipe = {
      id: uuidv4(),
      label: name,
      ingredients: ingredientsArray.map((ingredient, index) => ({ text: ingredient, weight: index })),
      ingredientLines: instructionsArray,
      newlyCreated: true
    };

    console.log('New Recipe:', newRecipe);
    addRecipe(newRecipe);
    navigate('/recipes');
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
        <button className="submit-button" type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
