const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const mongoURL = 'mongodb://db:27017'; 

app.get('/', (req, res) => {
  
  MongoClient.connect(mongoURL, (err, client) => {
    if (err) {
      console.error('Failed to connect to MongoDB:', err);
      res.status(500).send('Failed to connect to MongoDB');
      return;
    }

    const db = client.db('mydb'); 
    const collection = db.collection('fruits'); 

    collection.aggregate([
      {
        $match: { name: 'apples' }
      },
      {
        $group: {
          _id: null,
          totalQty: { $sum: '$qty' }
        }
      }
    ]).toArray((err, result) => {
      if (err) {
        console.error('Failed to retrieve data from MongoDB:', err);
        res.status(500).send('Failed to retrieve data from MongoDB');
      } else {
        const totalQty = result.length > 0 ? result[0].totalQty : 0;
        res.send(`Hello world! Total quantity of apples from all the document's at the DB: ${totalQty}`);
      }

      client.close();
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});