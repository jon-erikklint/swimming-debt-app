const measuresRouter = require("express").Router()

const model = require("../model")

measuresRouter.get("/", (req, res) => {
    res.json(model.getMeasures())
})

measuresRouter.get("/:name", (req, res) => {
    const name = req.params.name
    res.json(model.getMeasure(name))
})

measuresRouter.delete("/:name", (req, res) => {
    const name = req.params.name
    model.deleteMeasure(name)

    res.status(204).end()
})

measuresRouter.put("/", (req, res) => {
    const measure = req.body

    if (measure == null || measure.name == null || measure.exchangeRatio == null) {
        res.status(400).end()
        return
    }

    const updatedMeasure = model.updateMeasure(measure.name, measure.exchangeRatio)

    if (updatedMeasure == null) res.status(404).end()
    else res.json(updatedMeasure)
})

measuresRouter.post("/", (req, res) => {
    const measure = req.body
    
    if (measure == null || measure.name == null || measure.exchangeRatio == null || measure.startValue == null || getMeasure(measure.name) != null) {
        res.status(400).json()
        return
    }

    const addedMeasure = model.addMeasure(measure.name, measure.exchangeRatio, measure.startValue)

    res.json(addedMeasure)
})

measuresRouter.post("/swap", (req, res) => {
    const measures = req.body

    if (measures == null || measures.first == null || measures.second == null) {
        res.status(400).end()
        return
    }

    const swapped = model.swapMeasures(measures.first, measures.second)

    res.status(swapped ? 200 : 400).end()
})

module.exports = measuresRouter