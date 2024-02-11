// function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next(); // Proceed if the user is authenticated
//     }
//     res.redirect("/login"); // Redirect to login page if not authenticated
// }

// function isAdmin(req, res, next) {
//     if (req.isAuthenticated() && req.user.isAdmin) {
//         return next(); // Proceed if the user is authenticated and is an admin
//     }
//     res.redirect("/login"); // Redirect to login page if not authenticated or not an admin
// }

// module.exports = {
//     isAuthenticated,
//     isAdmin
// };


const collection = require('../models/users');

const isAdmin = async (req, res, next) => {
    try {
        const currentUser = req.user; 

        const user = await collection.findOne({ username: currentUser.username });

        if (!user || !user.isAdmin) {
            return res.status(403).send("Access denied. You are not authorized to access this page.");
        }
        
        next();
    } catch (error) {
        console.error("Error checking admin access:", error);
        res.status(500).send("An error occurred while checking admin access.");
    }
};

module.exports = isAdmin;
