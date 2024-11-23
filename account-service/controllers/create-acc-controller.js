const AccountDAO = require("../data-access/accounts-dao");

exports.createAccount = (req, res) => {
  const { accNumber, name, balance } = req.body;
  AccountDAO.createAcc({ accNumber, name, balance })
    .then((result) => {
      res.status(200).json({ data: result, message: "Account created!" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ data: null, message: "Error in creating an account." });
    });
};
