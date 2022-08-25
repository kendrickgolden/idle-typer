const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextSchema = new Schema(
    {
        Title: {type: String, required:true},
        Author: {type: String, required:true},
        Chapters: {type:[String], required:true}
    }
)

module.exports = mongoose.model('Text', TextSchema);