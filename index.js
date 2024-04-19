const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const questionRoutes = require("./routes/questionRoute");
const UserModel = require('./model/userModel');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());//This means we are passing the data from the frontend to Jason format
app.use("/api/auth",userRoutes);
app.use("/api/game",questionRoutes);

// app.get('/getUsers',(req,res) =>{
//     UserModel.find()
//     .then(users => res.json(users))
//     .catch(err => res.json(err))
// })
// app.get('/getUsers/:level', (req, res) => {
//     const { level } = req.params;
//     UserModel.find({}, 'username email avatarImage scores')
//     .then(users => {
//         users = users.map(user => ({
//             ...user._doc,
//             score: user.scores[level] || 0  // Provide a default score if none set
//         }));
//         res.json(users);
//     })
//     .catch(err => {
//         console.error('Error fetching users:', err);
//         res.status(500).json(err);
//     });
// });

// This would typically be in your route handler in Express
app.get('/getUsers/:level', async (req, res) => {
    try {
        const level = req.params.level;
        const users = await UserModel.find().sort({ [`scores.${level}`]: -1 }); // Sort descending by score at the specified level
        const usersWithRank = users.map((user, index) => ({
            ...user.toObject(),
            rank: index + 1  // Assigning rank based on array index (which is zero-based)
        }));
        res.json(usersWithRank);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Failed to fetch users', err });
    }
});


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection is successful ready to go!!");
}).catch((err) => {
    console.log("Database connection error:", err);
});


const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server has started sucessfully on port ${process.env.PORT}`);
} );