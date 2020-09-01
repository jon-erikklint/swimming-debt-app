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

function getMeasures() {
    return measures
}

function getMeasure(measureName) {
    return measures.find(measure => measure.name === measureName)
}

function getMeasurements(measureName) {
    return measurements.filter(measurement => measurement.measure === measureName)
}

function deleteMeasurements(measureName) {
    measurements = measurements.filter(measurement => measurement.measure !== measureName)
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

function deleteMeasure(name) {
    measures = measures.filter(measure => measure.name !== name)
}

function sortMeasures() {
    measures = measures.sort((measure1, measure2) => measure1.orderId - measure2.orderId)
}

module.exports = {
    getMeasures, getMeasure, getMeasurements, deleteMeasure, addMeasure, addMeasurement, swapMeasures, updateMeasure, deleteMeasurements
}