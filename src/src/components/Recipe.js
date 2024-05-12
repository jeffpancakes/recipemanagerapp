const Recipe = ({ name, ingredients, instructions }) => {
  return (
    <div className="recipe-card">
      <h2>{name}</h2>
      <div className="ingredients">
        <h3>Ingredients:</h3>
        <ul>
          {Array.isArray(ingredients) && ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="instructions">
        <h3>Instructions:</h3>
        <ol>
          {Array.isArray(instructions) && instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Recipe;
