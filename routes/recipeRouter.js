const express = require("express");
const router = express.Router();

const createAbl = require("../abl/recipe/createAbl.js");
const deleteAbl = require("../abl/recipe/deleteAbl.js");
const updateAbl = require("../abl/recipe/updateAbl.js");
const getAbl = require("../abl/recipe/getAbl.js");
const listAbl = require("../abl/recipe/listAbl.js");

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