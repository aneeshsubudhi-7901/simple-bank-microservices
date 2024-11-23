var express = require('express');
const accCtrl = require("../controllers/accounts-api-controller")
var router = express.Router();



//GET /api/accounts/{:accNumber}
//POST /api/accounts/{:accNumber}/deposit
//POST /api/accounts/{:accNumber}/withdraw

router.get("/:accNumber",accCtrl.getAccDetails)
router.post("/:accNumber/deposit",accCtrl.doDeposit)
router.post("/:accNumber/withdraw",accCtrl.doWithdraw)



module.exports = router;
