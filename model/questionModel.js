const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question: String,
    solution:Number
});

module.exports = mongoose.model('Question',QuestionSchema);