const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://todo_user:cQzs4y1PdAPDcaQn@cluster0.081q2sn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});