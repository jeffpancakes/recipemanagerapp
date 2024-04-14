const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(__dirname, "storage", "userList");

function get(userId) {
  const filePath = path.join(userFolderPath, `${userId}.json`);
  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

function create(user) {
  user.id = crypto.randomBytes(16).toString("hex");
  const filePath = path.join(userFolderPath, `${user.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(user), "utf8");
  return user;
}

function update(user) {
  const filePath = path.join(userFolderPath, `${user.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(user), "utf8");
  return user;
}

function remove(userId) {
  const filePath = path.join(userFolderPath, `${userId}.json`);
  fs.unlinkSync(filePath);
  return {};
}

function list() {
  const files = fs.readdirSync(userFolderPath);
  return files.map((file) => JSON.parse(fs.readFileSync(path.join(userFolderPath, file), "utf8")));
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};

