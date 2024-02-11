const express = require('express');
const router = express.Router();
const isAdmin = require('../middleware/authMiddleware'); 
const { renderAdminPanel, addUser, editUser, deleteUser } = require('../controllers/adminController'); 

router.get('/', isAdmin, renderAdminPanel);

router.post('/add-user', isAdmin, addUser);

router.put('/edit-user/:userId', isAdmin, editUser);

router.delete('/delete-user/:userId', isAdmin, deleteUser);

module.exports = router;
