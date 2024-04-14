const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const user = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 1 },
    name: { type: "string" },
    email: { type: "string" },
  },
  required: ["id", "name", "email"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const user = req.body;

    const valid = ajv.validate(user, user);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    const existingUser = userDao.get(user.id);
    if (!existingUser) {
      return res.status(404).json({
        code: "userNotFound",
        message: `User with ID ${user.id} not found`,
      });
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.email === user.email && u.id !== user.id);
    if (emailExists) {
      return res.status(400).json({
        code: "emailAlreadyExists",
        message: `Email ${user.email} is already in use by another user`,
      });
    }

    const updatedUser = userDao.update(user);
    return res.json(updatedUser);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;