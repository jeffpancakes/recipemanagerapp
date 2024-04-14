const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const recipeDao = require("../../dao/recipe-dao.js");

const recipeSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    ingredients: { type: "array", items: { type: "string" } },
    instructions: { type: "array", items: { type: "string" } },
    id: { type: "string" },
  },
  required: ["title", "ingredients", "instructions", "id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let recipe = req.body;

    const valid = ajv.validate(recipeSchema, recipe);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const existingRecipe = recipeDao.get(recipe.id);
    if (!existingRecipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe with id ${recipe.id} not found`,
      });
      return;
    }

    recipe = recipeDao.update(recipe);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = UpdateAbl;