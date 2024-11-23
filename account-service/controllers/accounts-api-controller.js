const AccountDAO = require("../data-access/accounts-dao");
const mq = require("../rabbitmq-connect");

exports.getAccDetails = (req, res) => {
  const accNumber = req.params.accNumber;
  AccountDAO.getAccDet(accNumber)
    .then((result) => {
      if (!result) {
        throw new Error("Account doesn't exist");
      }
      res
        .status(200)
        .json({ data: result, message: "Success, getting account details" });
    })
    .catch((error) => {
      res.status(500).json({
        data: [],
        message: `Error, getting account details. ${error}`,
      });
    });
};

exports.doWithdraw = async (req, res) => {
  // await mq.connectQueue();
  AccountDAO.doWith(req.body.amount, req.params.accNumber)
    .then(async (result) => {
      if (!result) {
        await mq.sendData("Balance below withdraw amount");
        throw new Error("Balance below withdraw amount");
      }

      await mq.sendData("Success, amount withdrawn");
      res.status(200).json({
        data: { modifiedCount: result.modifiedCount },
        message: "Success, amount withdrawn",
      });
    })
    .catch(async (error) => {
      await mq.sendData("Error, withdraw unsuccessful.");
      res.status(500).json({
        data: null,
        message: `Error, withdraw unsuccessful. ${error}`,
      });
    });
};

exports.doDeposit = async (req, res) => {
  // await mq.connectQueue();
  AccountDAO.doDep(req.body.amount, req.params.accNumber)
    .then(async (result) => {
      await mq.sendData("Success, amount deposited");
      res.status(200).json({
        data: { modifiedCount: result.modifiedCount },
        message: "Success, amount deposited",
      });
    })
    .catch(async (error) => {
      await mq.sendData("Error, deposit unsuccessful.");
      res
        .status(500)
        .json({ data: null, message: `Error, deposit unsuccessful. ${error}` });
    });
};
