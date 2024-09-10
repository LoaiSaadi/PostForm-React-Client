// models/orderModel.js
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);

async function getDocuments() {
  try {
    await client.connect();
    const database = client.db("Myshop");
    const Myorders = database.collection("Myorders");
    const documents = await Myorders.find().toArray();
    return documents;
  } finally {
    await client.close();
  }
}

async function insertDocument(data) {
  try {
    await client.connect();
    const database = client.db("Myshop");
    const Myorders = database.collection("Myorders");
    const result = await Myorders.insertOne(data);
    return result;
  } finally {
    await client.close();
  }
}

async function deleteDocument(id) {
  try {
    await client.connect();
    const database = client.db("Myshop");
    const Myorders = database.collection("Myorders");
    const result = await Myorders.deleteOne({ _id: new ObjectId(id) });
    return result;
  } finally {
    await client.close();
  }
}

async function updateDocument(id, data) {
  try {
    await client.connect();
    const database = client.db("Myshop");
    const Myorders = database.collection("Myorders");
    const result = await Myorders.updateOne({ _id: new ObjectId(id) }, { $set: data });
    return result;
  } finally {
    await client.close();
  }
}

module.exports = {
  getDocuments,
  insertDocument,
  deleteDocument,
  updateDocument,
};
