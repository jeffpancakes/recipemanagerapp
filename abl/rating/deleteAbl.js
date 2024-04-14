const ratingDao = require("../../dao/rating-dao.js");

async function DeleteAbl(req, res) {
  try {
    const { ratingId } = req.params;

    const deletedRating = ratingDao.remove(ratingId);
    if (!deletedRating) {
      return res.status(404).json({
        code: "ratingNotFound",
        message: `Rating with ID ${ratingId} not found`
      });
    }

    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = DeleteAbl;