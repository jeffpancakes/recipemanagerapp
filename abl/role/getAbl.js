const roleDao = require("../../dao/role-dao.js");

async function GetAbl(req, res) {
  try {
    const roleId = req.params.id;

    const role = roleDao.get(roleId);
    if (!role) {
      res.status(404).json({ message: `Role with ID ${roleId} not found` });
      return;
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = GetAbl;