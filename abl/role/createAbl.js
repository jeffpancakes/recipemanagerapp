const Ajv = require("ajv");
const ajv = new Ajv();
const roleDao = require("../../dao/role-dao.js");

const roleSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" }
  },
  required: ["name", "description"],
  additionalProperties: false
};

async function createAbl(req, res) {
  try {
    let role = req.body;

    const valid = ajv.validate(roleSchema, role);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "DTO in is not valid",
        validationError: ajv.errors
      });
      return;
    }

    const existingRole = roleDao.getByName(role.name);
    if (existingRole) {
      res.status(400).json({
        code: "roleAlreadyExists",
        message: `Role with name '${role.name}' already exists`
      });
      return;
    }

    role = roleDao.create(role);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = createAbl;
