const express = require("express");

const router = express.Router();
const User=require("../models/user.module")

router.get("", async (req, res) => {
    
    try {
        const users = await User.find().lean().exec();
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post("",async (req, res) => {
    
    try {
        const users = await User.create();
        return res.send(users);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});
   
module.exports = router;