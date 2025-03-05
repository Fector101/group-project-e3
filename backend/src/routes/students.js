const express = require('express')
const path = require('path')
// const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const verifyToken = require('../helper/basic')
const {Election,Candidate} = require('../models/Election');


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


router.get('/dashboard',verifyToken, (req, res) => {
    const userInfo = req.cookies.token
    console.log(userInfo)
    try{
        console.log(JSON.parse(userInfo.username),'|----|')
    }catch(err){
        console.log(err)
    }
    console.log(req)
    res.render('dashboard', { username: req.user.username });
})


router.get('/ele-results', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/pages/election-result.html'));
})


router.post("/vote", async (req, res) => {
    try {
        const { studentMatricNo, candidateMatricNo,electionId } = req.body;

        const candidate = (await Candidate.find({ matric_no: candidateMatricNo }))[0]
        if (!candidate) {
            return res.status(404).json({ msg: "Candidate not found" });
        }

        // Check if the voter has already voted
        const election = await Election.findById(electionId);
        console.log(election, '<----- election')
        if (election.voters.includes(studentMatricNo)) {
            return res.status(400).json({ msg: "You have already voted." });
        }

        // Add voter's matric number
        election.voters.push(studentMatricNo);
        candidate.voters.push(studentMatricNo);
        await candidate.save();
        await election.save();

        res.json({ msg: "Vote recorded successfully!", totalVotes: candidate.voters.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});



module.exports = router;
