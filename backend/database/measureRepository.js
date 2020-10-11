const database = require("./database")

const baseQuery = `
SELECT id, name, exchangeratio as "exchangeRatio", orderid, valuesum as "valueSum"
FROM measures
`

async function getAll() {
  return await database.get_query(baseQuery)
} 

async function getOne(id) {
  const query = baseQuery + "WHERE id=$1"
  return await database.get_one(query, [id])
}

async function getByName(name) {
  const query = baseQuery + "WHERE name=$1"
  return await database.get_one(query, [name])
}

async function deleteOne(id) {
  const query = "DELETE FROM measures WHERE id=$1"
  return await database.query(query, [id])
}

async function add(name, exchangeRatio) {
  const query = "INSERT INTO measures (name, exchangeRatio) VALUES ($1, $2) RETURNING id"
  return (await database.add_query(query, [name, exchangeRatio])).id
}

async function updateSum(id) {
  const query = `
  UPDATE measures AS m SET valueSum = ms.valueSum
  FROM (
    SELECT SUM(amount) AS valueSum, measureid
    FROM measurements
    WHERE measureId = $1
    GROUP BY measureId
  ) AS ms
  WHERE m.id = ms.measureid
  `

  return await database.query(query, [id])
}

module.exports = {
  getAll, getOne, getByName, deleteOne, add, updateSum
}