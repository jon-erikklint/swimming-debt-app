const measuresRouter = require("express").Router()

const model = require("../services/model")

measuresRouter.get("/", async (req, res) => {
    res.json(await model.getMeasures())
})

measuresRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    res.json(await model.getMeasure(id))
})

measuresRouter.delete("/:id", async (req, res) => {
    const id = req.params.id
    await model.deleteMeasure(id)

    res.status(204).end()
})

measuresRouter.put("/", async (req, res) => {
    const measure = req.body

    if (measure == null || measure.name == null || measure.exchangeRatio == null) {
        res.status(400).end()
        return
    }

    const updatedMeasure = await model.updateMeasure(measure.name, measure.exchangeRatio)

    if (updatedMeasure == null) res.status(404).end()
    else res.json(updatedMeasure)
})

measuresRouter.post("/", async (req, res) => {
    const measure = req.body
    
    if (measure == null || measure.name == null || measure.exchangeRatio == null || measure.startValue == null || await model.getMeasureByName(measure.name) != null) {
        res.status(400).json()
        return
    }

    const addedMeasure = await model.addMeasure(measure.name, measure.exchangeRatio, measure.startValue)

    res.json(addedMeasure)
})

measuresRouter.post("/reorder", async (req, res) => {
    const swapInfo = req.body

    if (swapInfo == null || swapInfo.measureName == null || swapInfo.up == null) {
        res.status(400).end()
        return
    }

    const swapped = await model.reorderMeasure(swapInfo.measureName, swapInfo.up)

    res.status(swapped ? 200 : 400).end()
})

measuresRouter.post("/reset/:name", async (req, res) => {
    const name = req.params.name

    const resetted = await model.resetMeasure(name)

    res.status(resetted ? 200 : 400).end()
})

module.exports = measuresRouter