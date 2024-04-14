const ratingDao = require("../../dao/rating-dao.js");

async function ListAbl(req, res) {
  try {
    const ratings = ratingDao.list();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ListAbl;