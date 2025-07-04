const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require("dotenv")
const staticRouts = require("./routes/static")
const postRoutes = require("./routes/Post")
const app = express()

dotenv.config()
const PORT = process.env.PORT || 5000;

const URL = `mongodb+srv://${process.env.CLUSTER_NAME}:${process.env.CLUSTER_PASSWORD}@blogify-cluster.bok96uh.mongodb.net/blogifyDB?retryWrites=true&w=majority&appName=Blogify-cluster`

mongoose.connect(URL)
.then(()=>console.log("mongodb is connected"))
.catch((err)=>console.log("mongodb error : ",err))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
// routes
app.use("/",staticRouts)
app.use("/",postRoutes)

app.listen(PORT,()=>console.log("server started "))