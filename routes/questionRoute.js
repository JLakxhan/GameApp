const {  tomata } = require("../controllers/questionController");

const router = require("express").Router();

router.get("/tomata",tomata);


module.exports = router;