const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")

const measuresRouter = require("./controllers/measuresRouter")
const measurementsRouter = require("./controllers/measurementsRouter")
const usersRouter = require('./controllers/usersRouter')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("build"))

app.use("/api/users", usersRouter)
app.use("/api/measures", measuresRouter)
app.use("/api/measurements", measurementsRouter)

module.exports = app