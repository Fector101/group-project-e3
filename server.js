require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const authRoutes =  require('./src/routes/admin-authn');
const userRoutes =  require('./src/routes/user-authn');
const adminRoutes = require('./src/routes/admin-panel');
const cors = require('cors');
const connectDB = require('./src/db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();


app.use(authRoutes);
app.use(userRoutes);
app.use(adminRoutes);

// Routes
// app.use('/api/auth', require('./src/routes/auth'));



app.get('/',(req,res)=>{
  res.sendFile('index.html')
})

// 404 Route
app.use((req,res)=>{
  res.status(404).send('Page This Page dosen\'t exist')
})



// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});