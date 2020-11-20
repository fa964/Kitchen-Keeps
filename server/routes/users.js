import express from 'express';
import check from 'express-validator';
import validationResult from 'express-validator';
import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
const router = express.Router()

router.post("/register", async (req, res) => {
    try {
        let { displayName, password } = req.body;
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        let newUser = new User({
            displayName,
            password
        })

        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt)
        newUser.password = hashedPassword
        await newUser.save()
        res.send('User is created');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server error")
    }
});

router.post("/login", async (req, res) => {
    res.send("Hello its working")
});

export default router;