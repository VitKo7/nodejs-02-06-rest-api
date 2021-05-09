const { MongoClient, ObjectID } = require('mongodb');

// --- MONGODB PRACTICE ---

const client = await new MongoClient(uriDb, {
    useUnifiedTopology: true,

    try{
       const results = await client.db().collection('todos').find().toArray()
    } catch(error) {
        console.error(error)
         next(e)
    } finally {
        await client.close()
    }
    
}).connect();

// --- Schema MONGOOSE PRACTICE ---

const Schema = mongoose.Schema;

const cats = new Schema({
    name: String,
    age: Number
})

const Cat = mongoose.model('cat', cats);