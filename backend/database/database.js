const { Pool } = require('pg')
const config = require("../utils/config")

class Database {
  constructor() {
    this.pool = new Pool({
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_NAME
    })
  }

  async query(query, params = []) {
    const result = await this.pool.query(query, params)
    return result
  }

  async get_query(query, params = []) {
    return (await this.pool.query(query, params)).rows
  }

  async get_one(query, params = []) {
    const rows = (await this.pool.query(query, params)).rows
    return rows.length > 0 ? rows[0] : null
  }

  async add_query(query, params = []) {
    return (await this.pool.query(query, params)).rows[0]
  }
}

const database = new Database()

module.exports = database