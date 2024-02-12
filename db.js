require('dotenv').config()

// MongoDB
const { MongoClient } = require('mongodb')

const mongoDbUri = `mongodb+srv://${process.env.MONGODB_ADMIN}:${process.env.MONGODB_PW}@cluster0.sut8v7b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(mongoDbUri)

const connectToMongoDb = async () => {

  try {
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await listDatabases(client)

  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
  
}

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases()
  console.log('Databases:')
  databasesList.databases.forEach( db => {
    console.log(`- ${db.name}`)
  })
}

// Beer CRUD
// Create Beer:
const createBeer = async (client, newBeer) => {
  const result = await client.db('whats-that-beer-db').collection('beersAndReviews').insertOne(newBeer)
  console.log(`New beer was created with the following id: ${result.insertedId}`)
}


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(mongoDbUri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectToMongoDb = async () => {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log('client:')
//     console.log(client)
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// const myMongoDb = client.db(process.env.DB)

module.exports = {
  mongoDbUri,
  client,
  connectToMongoDb,
}