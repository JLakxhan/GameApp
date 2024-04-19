
const { json } = require("express");
const Question = require("../model/questionModel");
const axios = require("axios");


module.exports.tomata = async (req,res)=>{
    try{
        const response = await axios.get("https://marcconrad.com/uob/tomato/api.php?out=json");
        const {question, solution} = response.data;

        const newQuestion = new Question ({
            question,solution
        });

        await newQuestion.save();

        res.json(newQuestion);
    }catch(ex){
        console.error(error);
        res.status(500).json({msg: 'server Error'});
    }
};