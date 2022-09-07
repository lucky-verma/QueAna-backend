var express = require("express");
const { getBehaviour, createBehaviour } = require("../controllers/Behaviour");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getBehaviour);
router.post("/create", createBehaviour);
module.exports = router;
