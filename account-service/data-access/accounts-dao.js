const account = require("../models/account");
const Account = require("../models/account");

module.exports = class AccountDAO {
  static async createAcc(accountObj) {
    try {
      accountObj.dateCreated = new Date();
      const accObj = await new Account(accountObj).save();
      return accObj;
    } catch (error) {
      console.log(`Could not create an account : ${error}`);
      return error;
    }
  }

  static async getAccDet(accNum) {
    try {
      const accObj = await Account.findOne({ accNumber: accNum });
      if (!accObj) return accObj;
      const { name, accNumber, balance } = accObj.toObject();
      return { name, accNumber, balance };
    } catch (error) {
      console.log(`Could not fetch account details : ${error}`);
    }
  }

  static async doDep(amount, accNumber) {
    try {
      const accObj = await Account.updateOne(
        { accNumber },
        {
          $inc: {
            balance: amount,
          },
        }
      );
      console.log(accObj);
      return accObj;
    } catch (error) {
      console.log(`Could not do deposit : ${error}`);
    }
  }

  static async doWith(amount, accNumber) {
    try {
      const accObj = await Account.findOne({ accNumber });
      if (accObj.balance - amount < 0) {
        return null;
      }
      return await Account.updateOne(
        { accNumber },
        {
          $inc: {
            balance: -amount,
          },
        }
      );
    } catch (error) {
      console.log(`Could not do withdraw : ${error}`);
    }
  }
};
