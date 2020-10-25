require("dotenv").config()

const RUN_PORT = process.env.PORT

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME

module.exports = {
    RUN_PORT, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME
}