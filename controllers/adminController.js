const bcrypt = require('bcrypt');
const collection = require('../models/users');

const saltRounds = 10; 

function generateUserID() {
    return Math.random().toString(36).substr(2, 9); 
}


async function createAdmin() {
    try {
        const existingAdmin = await collection.findOne({ username: "Nargiz" });
        if (!existingAdmin) {
            const userId = generateUserID(); 
            const hashedPassword = await bcrypt.hash("microlab", saltRounds); 
            const adminUser = new collection({
                userId,
                name: "Nargiz",
                username: "Nargiz",
                password: hashedPassword,
                isAdmin: true
            });
            await adminUser.save();
        }
    } catch (error) {
        console.error("Error creating admin:", error);
    }
}

async function renderAdminPanel(req, res) {
    try {
        const users = await collection.find();
        res.render("admin", { users });
    } catch (error) {
        console.error("Error rendering admin panel:", error);
        res.status(500).send("An error occurred while rendering admin panel.");
    }
}

async function addUser(req, res) {
    const {username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        const newUser = new collection({
            name: username,
            username,
            password: hashedPassword,
            userId:generateUserID()

        });
        await newUser.save();
        res.redirect('/admin');
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("An error occurred while adding user.");
    }
}
async function editUserForm(req, res) {
    try {
        const userId = req.params.userId;
        const user = await collection.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("edit-user", { user });
    } catch (error) {
        console.error("Error rendering edit user form:", error);
        res.status(500).send("An error occurred while rendering edit user form.");
    }
}

async function editUser(req, res) {
    const userId = req.params.userId;
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        await collection.findByIdAndUpdate(userId, { username, password: hashedPassword });
        res.redirect('/admin');
    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).send("An error occurred while editing user.");
    }
}

async function deleteUser(req, res) {
    const userId = req.params.userId;
    try {
        await collection.findByIdAndDelete(userId);
        res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("An error occurred while deleting user.");
    }
}

module.exports = {
    createAdmin,
    renderAdminPanel,
    addUser,
    editUserForm,
    editUser,
    deleteUser
};


