var express = require("express");
const { getResponse, createRespose } = require("../controllers/Response");

var router = express.Router();
const { checkAuth } = require("../middleware/auth_validate");

// Not needed
// POST '/auth/signup'
// router.get("/list", getResponse);
router.post("/create", checkAuth, createRespose);
module.exports = router;
