const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('dotenv').config();
require('./config/db.js');
const User = require('./models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const PORT = 3000;

const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

app.use(express.static(path.join(__dirname, "/dist/")))

app.get('/check_token', (req, res) => {
    // get token from headers, 
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).send("access denied")
    }
    // use jwt library to check token
    try {
       let decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
       res.status(200).send(decodedToken.dbUser)

    } catch(error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
          }
          res.status(400).json({ message: 'Invalid token' });
    }
    // send a response
})

app.post('/signup', async (req, res) => {
    // use model to put user in collection
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    User.create({...req.body, password: hashedPassword});
})
app.post('/login', async (req, res) => {
    // use model to put user in collection
    // should get the email and pass in the req.body
    // 1. get the user with this email
    let dbUser = await User.findOne({email: req.body.email});
    // compare
    // 2. compare entered password with pass of this user
    if (!dbUser) return res.status(400).send("email or password incorrect");

    bcrypt.compare(req.body.password, dbUser.password, (err, isMatch) => { 
        if (isMatch) {
            // let the frontend know that the login was successful!
            // dont want password
            dbUser.password = "";
            // now just email and username
            const token = jwt.sign({dbUser}, process.env.TOKEN_SECRET, { expiresIn: "1h" });
            res.status(200).send({token, dbUser});

            // log them in ( on frontend can do certain things, get info related to account, can do BACKEND stuff related to their account, permissions for CRUD functionality related to their account, allow only certain users to do certain things )
        } else {
            res.status(400).send("email or password incorrect")
        }
    })
})


app.get("/posts", (req, res) => {
    
    let token = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(400).send("you're not logged in!")




    res.send({message: "your posts are here", posts: ["Becky is sooooo cute"]})
})
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


