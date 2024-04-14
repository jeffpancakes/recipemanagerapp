const roleDao = require("../../dao/role-dao.js");

async function ListAbl(req, res) {
  try {
    const roleList = roleDao.list();
    res.json(roleList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = ListAbl;