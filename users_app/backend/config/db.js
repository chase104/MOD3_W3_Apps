// connect mongoose to DB

const mongoose = require('mongoose');

let connectionString = `mongodb+srv://userOne:${process.env.MONGO_PASS}@cluster0.loes5ey.mongodb.net/Company?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// log when connected

mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});
