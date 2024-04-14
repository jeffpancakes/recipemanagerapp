const express = require("express");
const router = express.Router();

const createAbl = require("../abl/role/createAbl.js");
const getAbl = require("../abl/role/getAbl.js");
const listAbl = require("../abl/role/listAbl.js");

router.get("/get", (req, res) => {
    getAbl(req, res);
});
router.get("/list", (req, res) => {
    listAbl(req, res);
});
router.post("/create", (req, res) => {
    createAbl(req, res);
});

module.exports = router;