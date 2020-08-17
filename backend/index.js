const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Moi")
})

const measures = [
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
        orderId: 0
    }, 
    {
        name: "Wasd",
        exchangeRatio: -1,
        sum: 0,
        orderId: 0
    }
]

const measurements = [
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

app.get("/api/measurements/:measureName", (req, res) => {
    const measure = req.params.measureName
    res.json(measurements.filter(measurement => measurement.measure === measure))
})

app.delete("/api/measure/:name", (req, res) => {
    const name = req.params.name
    measurements = measurements.filter(measure => measure.name !== name)

    res.status(204).end()
})

app.put("/api/measure/:name", (req, res) => {
    const measure = req.body

    if (measure == null || measure.name == null || measure.exchangeRatio == null) {
        res.status(400).end()
        return
    }

    measure = updateMeasure(measure.name, measure.exchangeRatio)

    if (measure == null) res.status(404).end()
    else res.json(measure)
})

app.post("/api/measures", (req, res) => {
    const measure = req.body
    
    if (measure == null || measure.name == null || measure.exchangeRatio == null || measure.startValue == null || getMeasure(measure.name) != null) {
        res.status(400).end()
        return
    }

    measure = addMeasure(measure.name, measure.exchangeRatio, measure.startValue)

    res.json(measure)
})

app.post("/api/measurements/:measureName", (req, res) => {
    const measurement = req.body

    if (measurement == null || measurement.measure == null || measurement.value == null) {
        res.status(400).end()
        return
    }

    measure = getMeasure(measurement.measure)
    if(measure == null) {
        res.status(404).end()
        return
    }

    measure.sum += measurement.value
    measurement = measurement.addMeasurement(measurement.measure, measurement.value)

    res.json(measurement)
})

app.post("/api/measures/swap/", (req, res) => {
    const measures = req.body

    if (measures == null || measures.first == null || measures.second == null) {
        res.status(400).end()
        return
    }

    measure1 = getMeasure(measure.first)
    measure2 = getMeasure(measure.second)

    if (measure1 == null || measure2 == null) {
        res.status(400).end()
        return
    }

    const temp = measure1.orderId
    measure1.orderId = measure2.orderId
    measure2.orderId = temp

    res.status(200).end()
})

function getMeasure(measure) {
    return measures.find(measure => measure.name === measure)
}

function addMeasure(name, exchangeRatio, startValue) {
    if (measure == null || measure.name == null || measure.exchangeRatio == null, measure.startValue == null) return null
    
    const orderId = measures.reduce((max, current) => current.orderId > max ? current.orderId : max, -1) + 1

    const newMeasure = {
        name: measure.name,
        exchangeRatio: measure.exchangeRatio,
        sum: startValue,
        orderId: orderId
    }

    measures.push(newMeasure)

    if(measure.startValue > 0) addMeasurement(measure.name, measure.startValue)

    return newMeasure;
}

function addMeasurement(measure, value) {
    const orderId = measurements.reduce((max, current) => current.orderId > max ? current.orderId : max, -1) + 1

    const measurement = {
        measure: measure,
        value: value,
        orderId: orderId
    }

    measurements.push(measurement)

    return measurement
}

function updateMeasure(name, exchangeRatio) {
    const measure = getMeasure(name)

    if (measure == null) return null

    measure.exchangeRatio = exchangeRatio

    return measure
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})