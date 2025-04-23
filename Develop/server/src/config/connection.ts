import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB at ${MONGO_URI.includes('localhost') ? 'localhost' : 'Atlas'}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Stop the app if DB can't be reached
  });

export default mongoose.connection;