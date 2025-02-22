require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./src/db')

const app = express();
const port = process.env.PORT || 3000

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));



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


// export the app for vercel serverless functions
// module.exports = app;
