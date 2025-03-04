const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {Election,Candidate} = require('../models/Election');
const Student = require('../models/Student');
// const verifyToken = require('../helper/basic')

const router = express.Router();

// Add a new election
router.post('/add-election', async (req, res) => {
    try {
        const { title, description, startDate, endDate, status } = req.body;
        const newElection = new Election({ title, description, startDate, endDate, status });
        await newElection.save();
        res.status(201).json({ msg: 'Election added successfully', election: newElection });
    } catch (error) {
        console.log(error   )
        res.status(500).json({ msg: 'Error adding election' });
    }
});

router.get('/ongoing-elections', async (req, res) => {

    try {
        const ongoingElections = await Election.find({ status: 'ongoing' });
        
        if (!ongoingElections.length) {
            return res.status(404).json({ elections:[], msg: 'No ongoing elections found' });
        }

        res.json({ elections: ongoingElections });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
router.post('/election/:id/add-candidate', async (req, res) => {
    try {
        const { name,matric_no } = req.body;


        const electionId = req.params.id
        const election = await Election.findById(electionId);

        if (!election) return res.status(404).json({ message: 'Election not found' });


        const old_candidate = await Candidate.findOne({ matric_no });
        if (old_candidate) {
            const student_added_already = await Election.findOne({ 
                _id: electionId, 
                candidates: old_candidate.matric_no 
            })

            if (student_added_already) {
                return res.status(404).json({ msg: 'Candidate is already added to this election.'});
            } 
        }
        election.candidates.push({ name, matric_no });
        await election.save();

        const newCandidate = new Candidate({ name,matric_no });
        await newCandidate.save();


        res.json({ msg: 'Candidate added successfully', candidates: election.candidates });


    } catch (error) {
        console.log(error,' error')
        res.status(500).json({ msg: 'Error adding candidate' });
    }
});
router.get('/election/:id/candidates', async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) return res.status(404).json({ msg: 'Election not found' });

        res.json({candidates:election.candidates});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get("/election-candidate/:matric_no", async (req, res) => {
    try {
        const { matric_no } = req.params;

        // Find if any election has a candidate with this matric_no
        const candidate = await Candidate.findOne({ matric_no });

        if (candidate) {
            return res.json({ exists: true, candidate });
        } else {
            return res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking candidate:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// router.post('/signup', async (req, res) => {
//     try {
//         const { username, email, matric_no, password } = req.body
//         let user = await Student.findOne({ matric_no })
//         if (user) return res.status(400).json({ exists: true, msg: "Matric Number Already Register" })
//         user = await Student.findOne({ email })
//         if (user) return res.status(400).json({ exists: true, msg: "Email Already Used" })

//         console.log('Matric No: ',matric_no,'Password: ',password)
//         const hashedPassword = await bcrypt.hash(password, 10)

//         user = new Student({ username, matric_no, email, password: hashedPassword })
//         await user.save()

//         res.status(201).json({ ok: true, message: 'Student registered successfully' })
//     } catch (err) {
//         console.log('signup error: ', err)
//         res.status(500).json({ error: 'Server error' })
//     }
// });


// router.post('/login', async (req, res) => {
//     try {
//         const { matric_no, password } = req.body;

//         const user = await Student.findOne({ matric_no });
//         if (!user) return res.status(400).json({ error: 'Student doesn\'t exist' });


//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ error: 'Invalid password' });


//         const token = jwt.sign({ id: user._id, username: user.username, matric_no: user.matric_no }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Set token in HTTP-only cookie
//         res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour
        
//         res.json({ msg: user.username });
//     } catch (err) {
//         console.log('login error: ', err)
//         res.status(500).json({ error: 'Server error' });
//     }
// });

module.exports = router;
