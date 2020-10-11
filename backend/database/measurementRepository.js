const database = require("./database")

async function get(measureId) {
  const query = `
    SELECT id, measureid, amount, creationtime
    FROM measurements
    WHERE measureid = $1
  `
  return await database.get_query(query, [measureId])
}

async function add(measureId, amount) {
  const query = "INSERT INTO measurements (measureid, amount) VALUES ($1, $2) RETURNING id"
  return (await database.add_query(query, [measureId, amount])).id
}

async function deleteAll(measureId) {
  const query = "DELETE FROM measurements WHERE measureid = $1"
  return await database.query(query, [measureId])
}

module.exports = {
  get, add, deleteAll
}