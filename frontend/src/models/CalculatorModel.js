export default class CalculatorModel {
    constructor(name, sum, exchangeRatio) {
        this.name = name
        this.exchangeRatio = exchangeRatio

        this.sum = sum
        this.history = [sum]
    }
}