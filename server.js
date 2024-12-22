const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser"); 
const userRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

require('./cron/cronJobs');


dotenv.config(); // to Load environment variables

const app = express();

// Middleware
app.use(express.json()); // To parse JSON data

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());

// User routes
app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Testing the Route here
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
