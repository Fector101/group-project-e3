const express = require('express')
const path = require('path')
// const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const verifyToken = require('../helper/basic')


const router = express.Router();
router.use(cookieParser())


// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ error: 'Access denied' });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ error: 'Invalid token' });
//     }
// };


router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/signup.html'));
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/login.html'));
})

router.get('/ele-results', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/election-result.html'));
})


router.get('/voting', verifyToken, (req, res) => {
    // Use the user information from the token
    // console.log(req.user)
    // const { username } = req.user;
    // res.json({ message: `Welcome to the voting page, ${username}` });
    res.render('voting', { username: req.user.username });
    // res.sendFile(path.join(__dirname, '../../public/pages/voting.html'));
});

module.exports = router;
