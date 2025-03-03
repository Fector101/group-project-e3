require('dotenv').config()
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT =process.env.PORT || 7000;






const authns =  require('./src/routes/authns')
const adminRoutes =  require('./src/routes/admins')
const adminAPI =  require('./src/routes/admin-api')
const studentRoutes =  require('./src/routes/students')

const connectDB = require('./src/db')

// Middleware
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(
   cors({
  origin:process.env.FRONTEND_URL,//localhost:1234", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
 })
);
// app.use(cors({ origin: "http://localhost:1234" }));


// Connect to MongoDB
connectDB()


// Routes
app.use('/', studentRoutes)
app.use('/', adminRoutes)
app.use('/api/auth', authns)
app.use('/api/admin', adminAPI)




// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "dist"))); // Use "build" if CRA

// Catch-all route to serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Start the server
//app.listen(PORT, () => {
 // console.log(`Server is running on http://localhost:${PORT}`);
//});

module.exports = app
