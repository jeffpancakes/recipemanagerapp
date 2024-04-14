const ratingDao = require("../../dao/rating-dao.js");

async function GetAbl(req, res) {
  try {
    const { ratingId } = req.params;

    const rating = ratingDao.get(ratingId);
    if (!rating) {
      return res.status(404).json({
        code: "ratingNotFound",
        message: `Rating with ID ${ratingId} not found`
      });
    }

    res.json(rating);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetAbl;