const measurementsRouter = require("express").Router()

const model = require("../model")

measurementsRouter.get("/:measureName", (req, res) => {
    const measureName = req.params.measureName
    res.json(model.getMeasurements(measureName))
})

measurementsRouter.post("/", (req, res) => {
    const measurement = req.body

    if (measurement == null || measurement.measure == null || measurement.value == null) {
        res.status(400).end()
        return
    }

    const newMeasurement = model.addMeasurement(measurement.measure, measurement.value)

    if(newMeasurement == null) {
        res.status(404).end()
        return
    }

    res.json(newMeasurement)
})

module.exports = measurementsRouter