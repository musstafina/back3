const bcrypt = require('bcrypt');
const collection = require('../models/users');

async function signupUser(req, res, next) {
    const { username, password } = req.body;

    try {
        const existingUser = await collection.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists. Please choose a different username.');
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new collection({
            name: username,
            username,
            password: hashedPassword,
            userId: generateUserID(), 
            creationDate: new Date() 
        });

        await newUser.save();

        res.redirect("/"); 
    } catch (error) {
        if (error.code === 11000) { 
            return res.send('Username is already taken. Please choose a different username.');
        }
        console.error("Error creating user:", error);
        res.status(500).send("An error occurred while creating user.");
    }
}

function generateUserID() {
    return Math.random().toString(36).substr(2, 9); 
}


async function loginUser(req, res, next) {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("User name cannot found");
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (!isPasswordMatch) {
                res.send("Wrong password");
            } else {
                if (check.isAdmin) {
                    res.redirect("/admin"); 
                } else {
                    res.redirect("/home"); 
                }
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login.");
    }
};



module.exports = {
    signupUser,
    loginUser
};
