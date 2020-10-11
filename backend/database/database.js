const { Pool } = require('pg')

class Database {
  constructor() {
    this.pool = new Pool({
      user: "postgres",
      password: "admin",
      host: "localhost",
      port: 5432,
      database: "uintivelka"
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