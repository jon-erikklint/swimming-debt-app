const measureRepository = require('../database/measureRepository')
const measurementRepository = require("../database/measurementRepository")

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
    if(await getMeasure(measureId) == null) return false

    await measurementRepository.deleteAll(measureId)
    await measureRepository.updateSum(measureId)

    return true
}

async function addMeasure(name, exchangeRatio, startValue) {
    const index = await measureRepository.add(name, exchangeRatio)

    await addMeasurement(index, startValue)

    return index;
}

async function addMeasurement(measureId, value) {
    const measure = await getMeasure(measureId)
    if(measure == null) return null

    const newId = await measurementRepository.add(measureId, value)
    if (newId === null) return null;

    await measureRepository.updateSum(measureId)

    return newId
}

async function reorderMeasure(measureId, isUp) {
    await measureRepository.reorder(measureId, isUp)
    return true
}

async function updateMeasure(measureId, name, exchangeRatio) {
    await measureRepository.update(measureId, name, exchangeRatio)
    return true
}

async function deleteMeasure(measureId) {
    await measurementRepository.deleteAll(measureId)
    await measureRepository.deleteOne(measureId)
}

module.exports = {
    getMeasures, getMeasure, getMeasurements, deleteMeasure, addMeasure, addMeasurement, reorderMeasure, deleteMeasurements, updateMeasure, getMeasureByName
}