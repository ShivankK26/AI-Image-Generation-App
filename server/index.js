import express from 'express';
import * as dotenv from 'dotenv'; // Allowing us to import all the stuff from .env file.
import cors from 'cors';


// In mongoDB, we import the file with their file extension as well.
import connectDB from './mongodb/connect.js'; 
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


// Using the middleware to use postRoutes and dalleRoutes.
// We've created the API End-points, which we'll connect later with our front-end side. 
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


app.get("/", async (req,res) =>{
    res.status(200).json({
        message: 'Hello from DALL-E!',
    });
});

const startServer = async () =>{
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server started on localhost!'))
    } catch (error) {
        console.log(error);
    }
}

startServer(); // Start at 1:24:57