import React from 'react';
import Quote from '../components/Quote';
import Title from '../components/Title';
import '../styles/partials/homeStyles.css';

const Home = () => {
  const featuredRecipes = [
    { id: 1, name: 'Basic Pancakes', description: 'Simple, but delicious pancakes.' },
    { id: 2, name: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish without cream, of course.' },
    { id: 3, name: 'Flapjacks', description: 'Everybody likes flapjacks!' },
  ];

  return (
    <div className="home-container">
      <Title />
      
      <h2>Featured Recipes</h2>
      <div className="featured-recipes">
        {featuredRecipes.map(recipe => (
          <div key={recipe.id} className="home-recipe-card">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>

      {/* <h2>Latest Recipes</h2>
      <div className="latest-recipes">
        <p>Check out the newest recipes added by our community!</p>
      </div> */}

      <h2>Tips & Tricks For Cooking</h2>
      <div className="cooking-tips">
        <ul>
          <li>Always read the recipe all the way through before starting.</li>
          <li>"To get the best produce, either grow it yourself or bribe a grower."</li>
          <li>Use fresh ingredients for the best flavor.</li>
          <li>"Never back down, never what?"</li>
          <li>Prepare all your ingredients before you start cooking.</li>
        </ul>
      </div>

      <Quote />
    </div>
  );
};

export default Home;
