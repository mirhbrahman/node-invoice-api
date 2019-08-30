const helmet = require('helmet')
const express = require('express')
const app = express()

// Add security header
app.use(helmet())

// All Routes
require('./routes')(app)

// Create server
// Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listing on port ${PORT}`))