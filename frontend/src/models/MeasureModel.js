export default class MeasureModel {
    constructor(name, sum, exchangeRatio, orderId) {
        this.name = name
        this.exchangeRatio = exchangeRatio

        this.orderId = orderId

        this.sum = sum
        this.history = [sum]
    }
}