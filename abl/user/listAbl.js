const userDao = require("../../dao/user-dao.js");

async function ListAbl(req, res) {
  try {
    const userList = userDao.list();
    res.json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ListAbl;