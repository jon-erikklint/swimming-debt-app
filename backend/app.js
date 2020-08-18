const express = require('express')
const bodyParser = require('body-parser')

const measuresRouter = require("./controllers/measures")
const measurementsRouter = require("./controllers/measurements")

const app = express()

app.use(bodyParser.json())

app.use("/api/measures", measuresRouter)
app.use("/api/measurements", measurementsRouter)

module.exports = app