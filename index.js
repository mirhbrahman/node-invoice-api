const passport = require("passport");
const bodyParser = require('body-parser')
const config = require('config')
const mongoose = require('mongoose')
const helmet = require('helmet')
const express = require('express')
const app = express()

// DB connection
mongoose.connect(config.get('mongoURI'), { useNewUrlParser: true})
	.then(() => console.log('Connected to mongoDB'))
	.catch(err => console.log(err))

// Load body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Add security header
app.use(helmet())

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./utils/passport")(passport);

// All Routes
require('./routes')(app)

// Create server
// Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listing on port ${PORT}`))