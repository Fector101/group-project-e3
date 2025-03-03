const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    matric_no: { type: String, required: true },
    url: { type: String },
    voters: [{ type: String }] 
});

const electionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    candidates: [candidateSchema],
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], required: true, default: 'upcoming' }
}, { timestamps: true });


const Election = mongoose.model('Election', electionSchema);
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = { Election, Candidate }