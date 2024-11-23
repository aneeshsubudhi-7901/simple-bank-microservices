var express = require('express');
var router = express.Router();
const createAccCtrl = require("../controllers/create-acc-controller")
// POST /createAccount
// router.
router.post("/createAccount", createAccCtrl.createAccount)

module.exports = router;
