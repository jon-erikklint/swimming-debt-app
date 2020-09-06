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

function deleteMeasure(name) {
    measures = measures.filter(measure => measure.name !== name)
}

function sortMeasures() {
    measures = measures.sort((measure1, measure2) => measure1.orderId - measure2.orderId)
}

module.exports = {
    getMeasures, getMeasure, getMeasurements, deleteMeasure, addMeasure, addMeasurement, reorderMeasure, resetMeasure, updateMeasure, deleteMeasurements
}