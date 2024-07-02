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

async function createAbl(req, res) {
  try {
    let recipe = req.body;

    const valid = ajv.validate(recipeSchema, recipe);
    if (!valid) {
      
      return res.status(400).json({
        code: "invalidInput",
        message: "Invalid input data",
        validationError: ajv.errors
      });
    }

    recipe = await recipeDao.create(recipe);

    return res.status(201).json(recipe);
  } catch (error) {
    
    console.error("Error in createAbl:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = createAbl;
