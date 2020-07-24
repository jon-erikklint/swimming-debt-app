export default class MeasureModel {
    constructor(name, sum, exchangeRatio) {
        this.name = name
        this.exchangeRatio = exchangeRatio

        this.sum = sum
        this.history = [sum]
    }
}