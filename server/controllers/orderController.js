// controllers/orderController.js
const { getDocuments, insertDocument, deleteDocument, updateDocument } = require('../models/orderModel');

// Fetch all orders
async function fetchOrders(req, res) {
  try {
    const documents = await getDocuments();
    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).send('Error fetching documents');
  }
}

// Create a new order
async function createOrder(req, res) {
  try {
    const data = req.body;
    const result = await insertDocument(data);
    res.status(200).send(`Document inserted with ID: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).send('Error inserting document');
  }
}

// Delete an order by ID
async function removeOrder(req, res) {
  try {
    const id = req.params.id;
    const result = await deleteDocument(id);
    if (result.deletedCount === 1) {
      res.status(200).send(`Document with ID: ${id} deleted successfully`);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Error deleting document');
  }
}

// Update an order by ID
async function modifyOrder(req, res) {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateDocument(id, data);
    if (result.matchedCount === 1) {
      res.status(200).send(`Document with ID: ${id} updated successfully`);
    } else {
      res.status(404).send('Document not found');
    }
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).send('Error updating document');
  }
}

module.exports = {
  fetchOrders,
  createOrder,
  removeOrder,
  modifyOrder,
};
