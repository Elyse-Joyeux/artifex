import express from 'express'
import * as dotenv from 'dotenv'
import OpenAI from "openai"


dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

router.route("/").get((req, res)=>{
    res.send("Hello from Artifex")
})

router.route("/").post(async(req, res)=>{
    try{
        const {prompt} = req.body
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        })

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({photo: image})
        
    } catch(err){
    console.log(err)
    res.status(500).send(err?.response.data.err.message)
    }
} )



export default router