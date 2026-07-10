const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  process.env.MONGODB_URI;
let _db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const mongoConnect = async (callback) => {
  try {
    console.log("Successfully connected to MongoDB!");
    await client.connect();
    _db = client.db("netflix-clone-auth");
    callback();
  } catch (err) {
    console.log("ERROR TO CONNECT TO DATABASE", err);
  }
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
