const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(email, password) {
    (this.email = email), (this.password = password);
  }

  async save() {
    try {
      const db = getDB();
      let dbOp;

      if (this._id) {
        return (dbOp = await db
          .collection("users")
          .updateOne({ _id: this._id }, { $set: this }));
      } else {
        return (dbOp = await db.collection("users").insertOne(this));
      }
    } catch (err) {
      err.status = 500;
      err.message = "Error to save user";
      throw err;
    }
  }

  static async findOne(email) {
    try {
      const db = getDB();
      const user = await db.collection("users").findOne({ email: email });
      return user;
    } catch (err) {
      err.status = 404;
      err.message = "User Not Found";
      throw err;
    }
  }
}

module.exports = User;
