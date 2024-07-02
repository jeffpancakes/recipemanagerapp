const recipeDao = require("../../dao/recipe-dao.js");

async function deleteAbl(req, res) {
  try {
    const recipeId = req.params.id;

    
    const deletedRecipe = await recipeDao.remove(recipeId);
    
    if (!deletedRecipe) {
      
      return res.status(404).json({ message: "Recipe not found" });
    }
    
    return res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    
    console.error("Error in deleteAbl:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = deleteAbl;
