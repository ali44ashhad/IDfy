import mongoose from 'mongoose';

const connectDB = async () => {
    try {
     await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
     console.log('Connected to MongoDB');
    } catch (error) {
      console.error("MongoDB Error:", error.message);
      throw error; // 🔥 VERY IMPORTANT
    }
}

export default connectDB;