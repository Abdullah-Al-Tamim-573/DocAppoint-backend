const express = require('express');
require('dotenv').config()
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())



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

        // await client.connect();


        const db = client.db("docAppoint573");
        const doctorsCollection = db.collection("doctors");
        const appointmentsCollection = db.collection("appointments")

        // doctors 
        app.get("/doctors", async (req, res) => {
            const cursor = await doctorsCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        // single doctor 
        app.get('/doctors/:id', async (req, res) => {
            let { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const result = await doctorsCollection.findOne(query);
            res.send(result)
        })


        // doctor appointments post 

        app.post('/doctorAppointments', async (req, res) => {
            let formData = req.body;
            const result = await appointmentsCollection.insertOne(formData);
            res.send(result)

        })

        // appointment doctors list

        app.get('/doctorAppointments', async (req, res) => {
            const cursor = await appointmentsCollection.find();
            const result = await cursor.toArray();
            res.send(result)
        })

        // appointment doctor delete (single doctor delete)
        app.delete('/doctorAppointments/:id', async (req, res) => {
             let {id} = req.params;
             let query = {_id : new ObjectId(id)};
             let result = await appointmentsCollection.deleteOne(query);
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

