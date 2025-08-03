const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT ;
app.use(cors());
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', // React app URL
  credentials: true // if using cookies or sessions
}));


// Routes
app.use('/auth', authRoutes);



// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    startServer();
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));



// Separate app.listen
function startServer() {
  app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);
    
  });
}