  import dotenv from "dotenv";
  dotenv.config();

  import express from 'express';
  import connectDB from './config/db.js';
  import adminRoutes from './routes/adminRoutes.js'
  import cookieParser from 'cookie-parser';
  import cors from 'cors';
  import userRoutes from './routes/userRoutes.js';


  const app = express()
  const port = 9000

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());


  app.use(cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
  }));
  app.use("/api/auth", adminRoutes);
  app.use("/api/user", userRoutes);
  
  const startServer = async () => {
      try {
        await connectDB();
          app.listen(port, () => {
          console.log(`Server running on ${port}`);
        });
    
      } catch (error) {
          console.log('Error starting the server', error);
          process.exit(1);
      }
    };
    
    startServer();
