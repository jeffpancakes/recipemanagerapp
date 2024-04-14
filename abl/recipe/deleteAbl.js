const recipeDao = require("../../dao/recipe-dao.js");

async function DeleteAbl(req, res) {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = recipeDao.remove(recipeId);
    if (!deletedRecipe) {
      res.status(404).json({ message: "Recipe not found" });
      return;
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = DeleteAbl;