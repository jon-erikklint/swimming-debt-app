const http = require("http")
const app = require("./app")

const config = require("./utils/config")

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`server is running on port ${config.PORT}`)
})