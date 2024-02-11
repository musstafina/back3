const express = require('express');
const path = require('path')
const collection = require('./mongoDB')
// const { createAdmin } = require('./controllers/adminController');
const signupRoute = require('../routes/signup');
const loginRoute = require('../routes/login');

const app = express();


app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"))


app.use('/', loginRoute);
app.use('/signup', signupRoute);

app.get("/home", (req, res) => {
    res.render("home");
});

app.listen(3000, ()=> {
    console.log(`Server running on port 3000`)
})