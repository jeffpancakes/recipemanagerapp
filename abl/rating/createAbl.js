const Ajv = require("ajv");
const ajv = new Ajv();
const ratingDao = require("../../dao/rating-dao.js");

const ratingSchema = {
  type: "object",
  properties: {
    userId: { type: "string", minLength: 1 },
    recipeId: { type: "string", minLength: 1 },
    rating: { type: "number", minimum: 1, maximum: 5 }
  },
  required: ["userId", "recipeId", "rating"],
  additionalProperties: false
};

async function CreateAbl(req, res) {
  try {
    let rating = req.body;

    const valid = ajv.validate(ratingSchema, rating);
    if (!valid) {
      return res.status(400).json({
        code: "invalidInput",
        message: "Invalid input data",
        validationError: ajv.errors
      });
    }

    rating = ratingDao.create(rating);
    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = CreateAbl;