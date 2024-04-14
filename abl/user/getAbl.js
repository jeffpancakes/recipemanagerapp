const userDao = require("../../dao/user-dao.js");

async function GetAbl(req, res) {
  try {
    const userId = req.params.id;
    const user = userDao.get(userId);
    if (!user) {
      return res.status(404).json({
        code: "userNotFound",
        message: `User with ID ${userId} not found`,
      });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetAbl;