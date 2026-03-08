import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Unknown Candidate'
    },
    email: {
        type: String,
        default: 'unknown@example.com'
    },
    atsScore: {
        type: Number,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        default: 'Analyzed'
    },
    resumeText: {
        type: String,
        default: ''
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Candidate', candidateSchema);
