const measurementsRouter = require("express").Router()

const model = require("../services/model")

measurementsRouter.get("/:measureId", async (req, res) => {
    const measureId = req.params.measureId
    res.json(await model.getMeasurements(measureId))
})

measurementsRouter.post("/", async (req, res) => {
    const measurement = req.body

    if (measurement == null || measurement.measure == null || measurement.value == null) {
        res.status(400).end()
        return
    }

    const newMeasurement = await model.addMeasurement(measurement.measure, measurement.value)

    if(newMeasurement == null) {
        res.status(404).end()
        return
    }

    res.json(newMeasurement)
})

module.exports = measurementsRouter