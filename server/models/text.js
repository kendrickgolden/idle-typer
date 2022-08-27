const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema(
    {
        title: {type: String, required:true},
        author: {type: String, required:true},
        chapters: [{
            title: {type: String, required:true},
            paragraphs: {type: [String], required:true}   
        }]
    }
)

module.exports = mongoose.model('Text', TextSchema);