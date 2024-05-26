import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/partials/recipesStyles.css';

const EditRecipe = ({ recipes, updateRecipe }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    const recipeToEdit = recipes.find((r) => r.id === id);
    if (recipeToEdit) {
      setName(recipeToEdit.label);
      setIngredients(recipeToEdit.ingredients.map(ingredient => ingredient.text).join('\n'));
      setInstructions(recipeToEdit.ingredientLines.join('\n'));
    }
  }, [id, recipes]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const ingredientsArray = ingredients.split('\n').map((item) => item.trim());
    const instructionsArray = instructions.split('\n').map((item) => item.trim());

    const updatedRecipe = {
      id,
      label: name,
      ingredients: ingredientsArray.map((ingredient, index) => ({ text: ingredient, weight: index })),
      ingredientLines: instructionsArray,
      newlyCreated: true
    };

    console.log('Updated Recipe:', updatedRecipe);
    updateRecipe(updatedRecipe);
    navigate('/recipes');
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
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

export default EditRecipe;
