const express = require('express');
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT;



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

        app.get("/doctors", async (req, res) => {
            const cursor = await doctorsCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
       console.log("Pinged your deployment. You successfully connected to MongoDB!");


        
    } finally {


    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

