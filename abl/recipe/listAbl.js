const recipeDao = require("../../dao/recipe-dao.js");

async function ListAbl(req, res) {
  try {
    const recipeList = recipeDao.list();
    res.json(recipeList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ListAbl;