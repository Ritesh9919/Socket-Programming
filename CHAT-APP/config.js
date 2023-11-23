import mongoose from "mongoose";


export const connectDB = async()=> {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat-app');
        console.log('Database connected successfully!');
    } catch (error) {
        console.log(error);
    }
  
}