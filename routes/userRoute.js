
const { register, login, setAvatar, updateScore,authenticate } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register",register);
router.post("/login",login);
router.post("/setAvatar/:id",setAvatar);

//router.post('/convertSvg', convertSvgToPng);

router.put("/updateScore", authenticate, updateScore);

module.exports = router;