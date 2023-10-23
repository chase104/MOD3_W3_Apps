const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
require('dotenv').config();
require('./config/db.js');
const User = require('./models/User.js');
const PORT = 3000;
const bcrypt = require('bcrypt');

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

app.post('/signup', async (req, res) => {
    // use model to put user in collection
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    User.create({...req.body, password: hashedPassword});
})

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


