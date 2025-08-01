const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://chiyaw:JZ7iYIJJl7BkXGZc@cluster0.0oxgmbz.mongodb.net/flogram', {useUnifiedTopology: true, useNewUrlParser: true})

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

connection.on('error', () => {
    console.log('MongoDB connection error');
});

module.exports = mongoose;