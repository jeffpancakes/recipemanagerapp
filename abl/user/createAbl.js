const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDao = require("../../dao/user-dao.js");

const user = {
  type: "object",
  properties: {
    username: { type: "string" },
    email: { type: "string" },
  },
  required: ["username", "email"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let user = req.body;

    const valid = ajv.validate(user, user);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "DTO in is not valid",
        validationError: ajv.errors,
      });
    }

    const userList = userDao.list();
    const emailExists = userList.some((u) => u.email === user.email);
    if (emailExists) {
      return res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
    }

    user = userDao.create(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = CreateAbl;