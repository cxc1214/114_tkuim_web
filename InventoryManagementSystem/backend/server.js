const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// TODO: Import routes
const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('Inventory Management System API Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
