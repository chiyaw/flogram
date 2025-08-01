const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.send(newUser);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (user) {
            res.send(user);
        } else {
            res.send('Invalid credentials');
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

router.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

module.exports = router;