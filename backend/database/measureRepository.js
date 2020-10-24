const database = require("./database")

const baseQuery = `
SELECT id, name, exchangeratio as "exchangeRatio", orderid, valuesum as "valueSum"
FROM measures
`

async function getAll() {
  return await database.get_query(baseQuery + "ORDER BY orderid")
} 

async function getOne(id) {
  return await database.get_one(baseQuery + "WHERE id=$1", [id])
}

async function getMaxId() {
  return await database.get_one("SELECT MAX(id) as id FROM measures")
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
  const query = "CALL add_measure($1, $2, NULL)"
  return (await database.add_query(query, [name, exchangeRatio])).id
}

async function reorder(id, isUp) {
  return await database.query("CALL reorder_measure($1, $2)", [id, isUp])
}

async function updateSum(id) {
  const query = `
  UPDATE measures AS m SET valueSum = ms.valueSum
  FROM (
    SELECT COALESCE(SUM(amount), 0) AS valueSum, m.id as measureid
	FROM measures as m
    LEFT JOIN measurements as mm
	ON m.id = mm.measureid 
    WHERE m.id = $1
    GROUP BY m.id
  ) AS ms
  WHERE m.id = ms.measureid
  `

  return await database.query(query, [id])
}

async function update(id, name, exchangeRatio) {
  const query = "UPDATE measures SET name = $1, exchangeratio = $2 WHERE id = $3"
  return await database.query(query, [name, exchangeRatio, id])
}

module.exports = {
  getAll, getOne, getMaxId, getByName, deleteOne, add, updateSum, reorder, update
}