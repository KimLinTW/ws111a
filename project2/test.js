const { MongoClient } = require('mongodb');
 
const url = 'mongodb+srv://dbUser:dbuser@magicmirror.xcrmaww.mongodb.net/?retryWrites=true&w=majority';

async function tstDB() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();

  const db = client.db('test2');
  const collection = db.collection('shops');

  await collection.insertOne({ id: 3394, name: '商店1' });
  const result = await collection.findOne({ id: 3394 });
  console.log(result);
  await collection.updateOne({ id: 3394 }, { $set: { name: '鮮花2' }});
  const updatedResult = await collection.findOne({ id: 3394 });
  console.log(updatedResult);

  await client.close();
}

tstDB().catch(console.error);