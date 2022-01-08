const express = require('express')
const app = express()
var cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
// import { MongoClient } from "mongodb";
const port = process.env.PORT || 3000 ;
app.use(cors())
app.use(express.json())
// dhakacollege
// Zg2pWkjHS6Nnnamu
const uri = "mongodb+srv://dhakacollege:QWqhp96Q72kGIRH2@cluster0.t8s5g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("dhakaCollege");
      const serviceCollection = database.collection("student");
    //   Get Api
      app.get('/student',async (req,res) =>{
          const cursor = serviceCollection.find({});
          const services = await cursor.toArray();
          res.send(services);
      })
      //Single API
      app.get('/student/:id' , async(req,res) =>{
        const id = req.params.id
        const quary ={_id:ObjectId(id)};
        const user =await serviceCollection.findOne(quary);
        res.send(user);
      })
      // delet api 
      app.delete('/student/:id' ,async(req,res)=>{
        const id =req.params.id
        const query ={_id:ObjectId(id)};
        const result =await serviceCollection.deleteOne(query);
        res.json(result);
      })


    //   Post API
     app.post('/student', async(req,res) =>{
         const netUser =req.body;
         const result =await serviceCollection.insertOne(netUser);
         console.log('getnew user', res.body)
         console.log('add user',result)
         res.json(result)
     })
   
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Dhaka College')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})