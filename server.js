require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const usersRoute = require('./routes/usersRoute');
const postsRoute = require('./routes/postsRoute');

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});