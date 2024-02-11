const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/userController');

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", loginUser);

module.exports = router;
