const mongoose = require('mongoose');
const { createAdmin } = require('../controllers/adminController'); 

const dbUrl = "mongodb+srv://merlenqyzy:microlab99@musstafina.feqeyzq.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { 
        console.log('Connected to MongoDB Atlas');
        createAdmin(); 
    })
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


// const Loginschema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         required: true,
//         unique: true // Ensure usernames are unique
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     creationDate: {
//         type: Date,
//         default: Date.now
//     },
//     updateDate: {
//         type: Date,
//         default: null
//     },
//     deletionDate: {
//         type: Date,
//         default: null
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false
//     }
// });
    
// const collection = new mongoose.model("users", Loginschema);

// module.exports = collection;