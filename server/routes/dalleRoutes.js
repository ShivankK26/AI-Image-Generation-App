import express from 'express';
import * as dotenv from 'dotenv'; // Allowing us to import all the stuff from .env file.
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

var configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req,res)=>{
    res.status(200).json({ message: "Hello from DALL-E!" });
});


router.route("/").post(async (req,res) =>{
    try {
        const { prompt } = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1, // Number of Images.
            size: "1024x1024", // Size of the Image. 
            response_format: "b64_json",
        });

        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image }); // Sending the collected image to Front-End.
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message || "Something went wrong");
    }
});


export default router;