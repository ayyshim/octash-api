const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    unique_id: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    ownership: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', ProjectSchema);