const fs = require("fs");
const path = require("path");

const roleFolderPath = path.join(__dirname, "storage", "roleList");

function get(roleId) {
  try {
    const filePath = path.join(roleFolderPath, `${roleId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadRole", message: error.message };
  }
}

function create(role) {
  try {
    const roleId = generateRandomId();
    role.id = roleId;
    const filePath = path.join(roleFolderPath, `${roleId}.json`);
    const fileData = JSON.stringify(role);
    fs.writeFileSync(filePath, fileData, "utf8");
    return role;
  } catch (error) {
    throw { code: "failedToCreateRole", message: error.message };
  }
}

function update(role) {
  try {
    const currentRole = get(role.id);
    if (!currentRole) return null;
    const updatedRole = { ...currentRole, ...role };
    const filePath = path.join(roleFolderPath, `${role.id}.json`);
    const fileData = JSON.stringify(updatedRole);
    fs.writeFileSync(filePath, fileData, "utf8");
    return updatedRole;
  } catch (error) {
    throw { code: "failedToUpdateRole", message: error.message };
  }
}

function remove(roleId) {
  try {
    const filePath = path.join(roleFolderPath, `${roleId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveRole", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(roleFolderPath);
    const roleList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(roleFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return roleList;
  } catch (error) {
    throw { code: "failedToListRoles", message: error.message };
  }
}

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};