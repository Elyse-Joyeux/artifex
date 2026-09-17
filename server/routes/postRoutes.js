import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
import Post from "../db/models/post.js"
import OpenAI from "openai"


dotenv.config()

const router = express.Router()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

router.route("/").get((req, res) => {
    res.send("Hello from Post Routes")
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//get route for all posts
router.route("/").get(async(req, res)=>{
    try{
        const posts = await Post.find({})
        res.status(200).json({success: true, data: posts})
    } catch(error){
        res.status(500).json({success: false, message: error.message})
    }
})

//create post route
router.route("/").post(async(req, res)=>{
    try{
        const {name, prompt, photo} = req.body
        const photoUrl = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })
        res.status(201).json({success: true, data: newPost})
    } catch(error){
        res.status(500).json({success: false, message: error.message})
    }
})

export default router