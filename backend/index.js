import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


//handle the default home route.
app.get('/', (request, response) => {
    //get() is a http method which is use to get the resource from server, it's first parameter is a string of our route & second parameter is  acallback function which handle this request & response.
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});


//access all routes
//each routes starts with /books
app.use('/books', booksRoute);



//connect database.
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');

    //when our database get connected only then we run our server this is why we write app.listen() inside the .then block.
    app.listen(PORT, () => {
        // we return this callback function back to listen() method
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });