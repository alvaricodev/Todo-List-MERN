const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo-list', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define your API routes here
const todoRoutes = require('./routes/todoRoutes');
app.use('/api/todos', todoRoutes);

// Define a route for the root path ("/")
app.get('/', (req, res) => {
    res.send('Welcome to the Todo List API!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
