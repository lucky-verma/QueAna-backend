var express = require("express");
const { getResponse, createResponse } = require("../controllers/Response");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getResponse);
router.post("/create", createResponse);
module.exports = router;
