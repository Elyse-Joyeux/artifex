import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./db/connect"

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json({limit:"50mb"}))

app.get("/", async (req, res)=>{
    res.send("Hello from Artifex!")
})

const startServer = async () =>{

    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8000, ()=>{
        console.log("Server running on http://localhost:8000")
    })

    }catch (err){
        console.log(err)
    }

}

startServer();