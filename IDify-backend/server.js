  import dotenv from "dotenv";
  dotenv.config();

  import express from 'express';
  import connectDB from './config/db.js';
  import adminRoutes from './routes/adminRoutes.js'
  import cookieParser from 'cookie-parser';
  import cors from 'cors';
  import userRoutes from './routes/userRoutes.js';
  import Stripe from 'stripe';

  const app = express()
  const port = 9000

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  app.use(cors({
      origin: "https://i-dfy-x5bu.vercel.app",
       credentials: true, 
  }));
  app.get("/", (req, res) => {
    res.send("API is running 🚀");
  });
  app.use("/api/auth", adminRoutes);
  app.use("/api/user", userRoutes);
  

  app.post('/api/create-subscription', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: 'price_1TcOL60vB7F9KLVpEuT9JEfd', // Replace with your $5 Price ID from Stripe
          quantity: 1,
        }],
        mode: 'subscription', // KEY CHANGE: Change from 'payment' to 'subscription'
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/pricing`,
      });
  
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.log("Error creating subscription", e);
    }
  });

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
