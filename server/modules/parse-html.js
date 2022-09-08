const fs = require('fs');
const mongoose = require('mongoose');
const Text = require('../models/text');
const arguments = process.argv;
const file = arguments[2];
const title = arguments[3];
const author = arguments[4];
const mongoDB = arguments[5];



mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

fs.readFile(file, 'utf8', async (err,raw_text) => {
    if (err) {
        console.error(err);
        return;
    }
    
    //Parse text and create an array of chapters
    const chapter_regex = /<div class="chapter">(.*?)<\/div>/gs; 
    const chapter_title_regex = /(?<=<\/a>).*(?=<\/h2>)/g;
    const chapter_text_regex =/(?<=<p.*>)(((?!<p.*>).)*)?(?=<\/p>)/gs;
    
    const chapters = raw_text.match(chapter_regex);
   
    const chapter_objs = chapters.map(chapter => ({ title: chapter.match(chapter_title_regex).toString(), paragraphs: chapter.match(chapter_text_regex)}));
    

    console.log(chapter_objs[0]);
    for(const chapter_obj of chapter_objs) {
     //  chapter_obj.paragraphs = chapter_obj.paragraphs.map(p => p.replace(/\r\n/g, ' '));
        chapter_obj.paragraphs = chapter_obj.paragraphs.map(p => p.replace(/\n/g, ' '));
        chapter_obj.paragraphs = chapter_obj.paragraphs.map(p => p.replace(/<.*?>/gs, ''));
        chapter_obj.paragraphs = chapter_obj.paragraphs.map(p => p.replace(/—/, '-'));
    }

    console.log(chapter_objs[0]);
    //Add text to mongoose database
    const text = await Text.create({title: title, author: author, chapters: chapter_objs});
});



