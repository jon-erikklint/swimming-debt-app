require("dotenv").config()

const RUN_PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
    RUN_PORT, DATABASE_URL
}