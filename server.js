
// Requiring the modules 
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


import userRoutes from './routes/users'

const app = express();
dotenv.config();

// Requiring the middlewares
app.use(morgan('dev'));
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use('/users', userRoutes)



mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.log('Error while connecting to MongoDB',err);
})

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})

