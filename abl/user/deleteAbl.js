const userDao = require("../../dao/user-dao.js");

async function DeleteAbl(req, res) {
  try {
    const userId = req.params.id;
    const deletedUser = userDao.remove(userId);
    if (!deletedUser) {
      return res.status(404).json({
        code: "userNotFound",
        message: `User with ID ${userId} not found`,
      });
    }
    res.json({ message: `User with ID ${userId} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = DeleteAbl;