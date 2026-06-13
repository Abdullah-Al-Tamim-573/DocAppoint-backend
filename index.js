const express = require('express');
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// app.use(express.json())



const uri = process.env.DB_URI;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();


        const db = client.db("docAppoint573");
        const doctorsCollection = db.collection("doctors");

        // doctors 
        app.get("/doctors", async (req, res) => {
            const cursor = await doctorsCollection.find();

            const result = await cursor.toArray();
            res.send(result)
        })

        // single doctor 

        app.get('/doctors/:id', async (req, res) => {
            let { id } = req.params;
            const query = {_id: new ObjectId(id)};
            const result = await doctorsCollection.findOne(query);
            res.send(result)
        })


        console.log("Pinged your deployment. You successfully connected to MongoDB!");



    } finally {


    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

