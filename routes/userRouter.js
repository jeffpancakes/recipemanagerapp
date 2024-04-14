const express = require("express");
const router = express.Router();

const createAbl = require("../abl/user/createAbl.js");
const deleteAbl = require("../abl/user/deleteAbl.js");
const updateAbl = require("../abl/user/updateAbl.js");
const getAbl = require("../abl/user/getAbl.js");
const listAbl = require("../abl/user/listAbl.js");

router.get("/get", (req, res) => {
    getAbl(req, res);
});
router.get("/list", (req, res) => {
    listAbl(req, res);
});
router.post("/create", (req, res) => {
    createAbl(req, res);
});
router.post("/update", (req, res) => {
    updateAbl(req, res);
});
router.post("/delete", (req, res) => {
    deleteAbl(req, res);
});

module.exports = router;