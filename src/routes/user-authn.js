const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body

        let user = await User.findOne({ username })
        if (user) return res.status(400).json({ error: 'Student already exists' })

        const hashedPassword = await bcrypt.hash(password, 10)

        user = new User({ username, email, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: 'Student registered successfully' })
    } catch (err) {
        console.log('signup error: ',   err)
        res.status(500).json({ error: 'Server error' })
    }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password)

        const user = await User.findOne({ username });
        console.log(user,' user')
        if (!user) return res.status(400).json({ error: 'Student doesn\'t exist' });


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid password' });


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.log('login error: ',   err)
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
