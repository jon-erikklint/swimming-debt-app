const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Moi")
})

let measures = [
    {
        name: "Asd",
        exchangeRatio: 1,
        sum: 1,
        orderId: 0
    }, 
    {
        name: "Gasd",
        exchangeRatio: 1,
        sum: 0,
        orderId: 1
    }, 
    {
        name: "Wasd",
        exchangeRatio: -1,
        sum: 0,
        orderId: 2
    }
]

let measurements = [
    {
        measure: "Asd",
        value: 1,
        orderId: 0
    }
]

app.get("/api/measures", (req, res) => {
    res.json(measures)
})

app.get("/api/measures/:name", (req, res) => {
    const name = req.params.name
    res.json(getMeasure(name))
})

app.delete("/api/measures/:name", (req, res) => {
    const name = req.params.name
    measures = measures.filter(measure => measure.name !== name)

    res.status(204).end()
})

app.put("/api/measures", (req, res) => {
    const measure = req.body

    if (measure == null || measure.name == null || measure.exchangeRatio == null) {
        res.status(400).end()
        return
    }

    const updatedMeasure = updateMeasure(measure.name, measure.exchangeRatio)

    if (updatedMeasure == null) res.status(404).end()
    else res.json(updatedMeasure)
})

app.post("/api/measures", (req, res) => {
    const measure = req.body
    
    if (measure == null || measure.name == null || measure.exchangeRatio == null || measure.startValue == null || getMeasure(measure.name) != null) {
        res.status(400).json()
        return
    }

    const addedMeasure = addMeasure(measure.name, measure.exchangeRatio, measure.startValue)

    res.json(addedMeasure)
})

app.post("/api/measures/swap", (req, res) => {
    const measures = req.body

    if (measures == null || measures.first == null || measures.second == null) {
        res.status(400).end()
        return
    }

    const swapped = swapMeasures(measures.first, measures.second)

    res.status(swapped ? 200 : 400).end()
})

app.get("/api/measurements/:measureName", (req, res) => {
    const measure = req.params.measureName
    res.json(measurements.filter(measurement => measurement.measure === measure))
})

app.post("/api/measurements", (req, res) => {
    const measurement = req.body

    if (measurement == null || measurement.measure == null || measurement.value == null) {
        res.status(400).end()
        return
    }

    const newMeasurement = addMeasurement(measurement.measure, measurement.value)

    if(newMeasurement == null) {
        res.status(404).end()
        return
    }

    res.json(newMeasurement)
})

function getMeasure(measureName) {
    return measures.find(measure => measure.name === measureName)
}

function addMeasure(name, exchangeRatio, startValue) {
    const orderId = measures.reduce((max, current) => current.orderId > max ? current.orderId : max, -1) + 1

    const newMeasure = {
        name: name,
        exchangeRatio: exchangeRatio,
        sum: startValue,
        orderId: orderId
    }

    measures.push(newMeasure)

    if(startValue > 0) addMeasurement(name, startValue)

    return newMeasure;
}

function addMeasurement(measureName, value) {
    const measure = getMeasure(measureName)
    if(measureName == null) return null

    const orderId = measurements.reduce((max, current) => current.orderId > max ? current.orderId : max, -1) + 1

    const measurement = {
        measure: measureName,
        value: value,
        orderId: orderId
    }

    measurements.push(measurement)
    measure.sum += measurement.value

    return measurement
}

function swapMeasures(measureName1, measureName2) {
    const measure1 = getMeasure(measureName1)
    const measure2 = getMeasure(measureName2)

    if (measure1 == null || measure2 == null) return false

    const temp = measure1.orderId
    measure1.orderId = measure2.orderId
    measure2.orderId = temp

    sortMeasures()

    return true
}

function updateMeasure(name, exchangeRatio) {
    const measure = getMeasure(name)

    if (measure == null) return null

    measure.exchangeRatio = exchangeRatio

    return measure
}

function sortMeasures() {
    measures = measures.sort((measure1, measure2) => measure1.orderId - measure2.orderId)
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})