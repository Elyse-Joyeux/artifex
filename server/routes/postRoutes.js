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

export default router