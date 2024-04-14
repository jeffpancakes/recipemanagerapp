const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../dao/recipe-dao.js");

const recipeSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    ingredients: { type: "array", items: { type: "string" } },
    instructions: { type: "array", items: { type: "string" } }
  },
  required: ["title", "ingredients", "instructions"],
  additionalProperties: false
};

async function CreateAbl(req, res) {
  try {
    let recipe = req.body;

    const valid = ajv.validate(recipeSchema, recipe);
    if (!valid) {
      res.status(400).json({
        code: "invalidInput",
        message: "Invalid input data",
        validationError: ajv.errors
      });
      return;
    }

    recipe = recipeDao.create(recipe);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = CreateAbl;