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

module.exports = {
  mongoDbUri,
  client,
  connectToMongoDb
}