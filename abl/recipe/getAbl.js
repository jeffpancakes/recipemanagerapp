const recipeDao = require("../../dao/recipe-dao.js");

async function GetAbl(req, res) {
  try {
    const recipeId = req.params.id;
    const recipe = recipeDao.get(recipeId);
    if (!recipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetAbl;