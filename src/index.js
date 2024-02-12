const express = require('express');
const path = require('path')
const collection = require('./mongoDB')

const signupRoute = require('../routes/signup');
const loginRoute = require('../routes/login');
const adminRoute = require('../routes/admin'); 
const weatherRoute = require('../routes/weather');
const apodRoutes = require('../routes/apod');
const newsRoutes = require('../routes/news')



const app = express();

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"))

app.use('/', loginRoute);
app.use('/signup', signupRoute);
app.use('/admin', adminRoute);
app.use('/weather', weatherRoute);
app.use('/apod', apodRoutes);
app.use('/news', newsRoutes)




app.get("/home", (req, res) => {
    res.render("home");
});

app.listen(3000, ()=> {
    console.log(`Server running on port 3000`)
})