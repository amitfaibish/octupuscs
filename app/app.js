const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoURL = 'mongodb://db:27017'; // Update with your MongoDB connection URL

// Define the route for the homepage
app.get('/', (req, res) => {
  // Connect to MongoDB
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Failed to connect to MongoDB:', err);
      res.status(500).send('Failed to connect to MongoDB');
      return;
    }

    // Access the database and collection
    const db = client.db('mydb'); // Replace 'your_database' with your actual database name
    const collection = db.collection('fruits'); // Replace 'your_collection' with your actual collection name

    // Query the database
    collection.findOne({ name: 'apples' }, { projection: { _id: 0, qty: 1 } }, (err, doc) => {
        if (err) {
        console.error('Failed to retrieve data from MongoDB:', err);
        res.status(500).send('Failed to retrieve data from MongoDB');
      } else {
        const qty = doc.qty;
        // Render the quantity along with "hello world!"
        res.send(`Hello, world! Quantity of apples: ${qty}`);
      }

      // Close the MongoDB connection
      client.close();
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
