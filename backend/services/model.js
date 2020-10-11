const measureRepository = require('../database/measureRepository')
const measurementRepository = require("../database/measurementRepository")

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

async function getMeasures() {
    return await measureRepository.getAll()
}

async function getMeasure(measureId) {
    return await measureRepository.getOne(measureId)
}

async function getMeasureByName(measureName) {
    return await measureRepository.getByName(measureName)
}

async function getMeasurements(measureId) {
    return await measurementRepository.get(measureId)
}

async function deleteMeasurements(measureId) {
    return await measurementRepository.deleteAll(measureId)
}

async function addMeasure(name, exchangeRatio, startValue) {
    console.log(name, exchangeRatio)
    const index = await measureRepository.add(name, exchangeRatio)
    /*const orderId = measures.reduce((max, current) => current.orderId > max ? current.orderId : max, -1) + 1

    const newMeasure = {
        name: name,
        exchangeRatio: exchangeRatio,
        sum: startValue,
        orderId: orderId
    }

    measures.push(newMeasure)

    if(startValue > 0) addMeasurement(name, startValue)*/

    return index;
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

function reorderMeasure(measureName, isUp) {
    const measure = getMeasure(measureName)
    if (measure == null) return false

    const id = measure.orderId

    const measure2 = measures.reduce((best, m) => {
        if (m === measure || (m.orderId >= id && isUp) || (m.orderId <= id && !isUp)) return best
        if (best == null) return m

        const isBetter = isUp
            ? best.orderId < m.orderId && m.orderId < id
            : best.orderId > m.orderId && m.orderId > id
        return isBetter ? m : best
    }, null)

    // can't move up/down -> that is fine
    if (measure2 == null) return true

    swapMeasureOrder(measure, measure2)

    return true
}

function swapMeasureOrder(measure1, measure2) {
    const temp = measure1.orderId
    measure1.orderId = measure2.orderId
    measure2.orderId = temp

    sortMeasures()
}

function resetMeasure(measureName) {
    const measure = getMeasure(measureName)
    if(measure == null) return false

    measure.sum = 0
    deleteMeasurements(measureName)

    return true
}

function updateMeasure(name, exchangeRatio) {
    const measure = getMeasure(name)

    if (measure == null) return null

    measure.exchangeRatio = exchangeRatio

    return measure
}

async function deleteMeasure(measureId) {
    await measureRepository.deleteOne(measureId)
}

function sortMeasures() {
    measures = measures.sort((measure1, measure2) => measure1.orderId - measure2.orderId)
}

module.exports = {
    getMeasures, getMeasure, getMeasurements, deleteMeasure, addMeasure, addMeasurement, reorderMeasure, resetMeasure, updateMeasure, deleteMeasurements, getMeasureByName
}