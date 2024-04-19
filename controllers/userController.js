const jwt = require('jsonwebtoken');
const { json } = require("express");
const User = require("../model/userModel");
const brcypt = require("bcrypt");
const sharp = require('sharp');


module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Assumes Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ msg: 'Authentication failed' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ msg: 'Server error during authentication', error });
    }
};

/*module.exports.register = async (req,res,next)=>{
    try{
        const{username,email,password} = req.body;
    const usernameCheck = await User.findOne({username})
    if(usernameCheck)
        return res.json({msg:"Username already used!",status:false});
    const emailCheck = await User.findOne({email});  
    if(emailCheck)
        return res.json({msg:"Email already used!",status:false});
    const hashedPassword = await brcypt.hash(password,10);
    const user = await User.create({
        email,username,password:hashedPassword
    });
    delete user.password;
    return res.json({status:true,user})
    }catch(ex){
        next(ex)
    }
};*/

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used!", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "Email already used!", status: false });
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with user info and token
        const userForResponse = { ...user._doc, password: undefined, token };
        return res.json({ status: true, user: userForResponse });
    } catch (ex) {
        next(ex);
    }
};


/*module.exports.login = async (req,res,next)=>{
    try{
        const{username,password} = req.body;
    const user = await User.findOne({username})
    if(!user)
        return res.json({msg:"Incorrect username or password!",status:false});
    const isPasswordValid = await brcypt.compare(password,user.password);
    if(!isPasswordValid)
    return res.json({msg:"Incorrect username or password!",status:false});
    delete user.password;
    return res.json({status:true,user})
    }catch(ex){
        next(ex)
    }
};*/


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect username or password!", status: false });

        const isPasswordValid = await brcypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect username or password!", status: false });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const userForResponse = { ...user._doc, password: undefined, token, avatarImage: user.avatarImage };

        return res.json({ status: true, user: userForResponse });
    } catch (ex) {
        next(ex);
    }
};


module.exports.setAvatar = async (req,res,next)=>{
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
          isAvatarImageSet: true,
          avatarImage,
        });
        return res.json({
          isSet: userData.isAvatarImageSet,
          image: userData.avatarImage,
        });
      } catch (ex) {
        next(ex);
      }
};

module.exports.updateScore = async (req, res, next) => {
    try {
        const { score, level } = req.body; // Extract score and level from the request
        if (!req.user.scores) {
            req.user.scores = { easy: 0, medium: 0, hard: 0 }; // Initialize if undefined
        }
        if (typeof req.user.scores[level] === 'undefined') {
            return res.status(400).json({ msg: 'Invalid game level specified' });
        }
        req.user.scores[level] = parseInt(score, 10); // Safely set the score for the specified level
        await req.user.save(); // Save the updated user
        res.json({ status: true, score: req.user.scores[level] }); // Respond with the updated score
    } catch (error) {
        console.error('Update Score Error:', error);
        res.status(500).json({ msg: 'Server error', error });
    }

    // try {
    //     const userId = req.user._id;
    //     const {score} = req.body;
    //    // const { userId, score } = req.body; // get userId and new score from request body
    //     const user = await User.findById(userId);
    //     if (!user) {
    //         return res.status(404).json({ msg: 'User not found' });
    //     }
    //     user.score=parseInt(score);
    //     await user.save();
    //    // res.json({ status: true, user });
    // } catch (error) {
    //     console.error('Update Score Error:', error);
    //     res.status(500).json({ msg: 'Server error', error });
    // }

    // try {
    //     const { score,level } = req.body;// Get the new score from the request body
    //     req.user.scores[level] = parseInt(score, 10); 
    //     //req.user.score = parseInt(score, 10); // Update the score on the user object attached by the middleware
    //     await req.user.save(); // Save the updated user
    //     res.json({ status: true, score: req.user.score[level] }); // Respond with the updated score
    // } catch (error) {
    //     console.error('Update Score Error:', error);
    //     res.status(500).json({ msg: 'Server error', error });
    // }
};


// module.exports.convertSvgToPng = async (req, res) => {
//     // const svgString = req.body.svg;
//     // if (!svgString) {
//     //     return res.status(400).json({ msg: 'No SVG data provided' });
//     // }
    
//     // try {
//     //     // SVG data must be a Buffer for Sharp to process it
//     //     const svgBuffer = Buffer.from(svgString, 'base64');
//     //     if (!svgBuffer) {
//     //         return res.status(400).json({ msg: 'Invalid SVG data' });
//     //     }

//     //     const pngBuffer = await sharp(svgBuffer)
//     //         .png()
//     //         .toBuffer();

//     //     res.set('Content-Type', 'image/png');
//     //     res.send(pngBuffer.toString('base64'));
//     // } catch (error) {
//     //     console.error('Error in convertSvgToPng:', error);
//     //     res.status(500).json({ msg: 'Error converting SVG to PNG', error: error.message });
//     // }
// };





