const express = require("express");
const router = express.Router();

const createAbl = require("../abl/rating/createAbl.js");
const deleteAbl = require("../abl/rating/deleteAbl.js");
const getAbl = require("../abl/rating/getAbl.js");
const listAbl = require("../abl/rating/listAbl.js");

router.get("/get", (req, res) => {
    getAbl(req, res);
});
router.get("/list", (req, res) => {
    listAbl(req, res);
});
router.post("/create", (req, res) => {
    createAbl(req, res);
});
router.post("/delete", (req, res) => {
    deleteAbl(req, res);
});

module.exports = router;