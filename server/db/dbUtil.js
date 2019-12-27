const mysql = require('mysql')
const config = require('../config/db.config')

const pool = mysql.createPool(config)

let excute = function(sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if(err) {
				reject(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if(err) {
						resolve(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}

let findDataByFilter = function(table, field, str) {
	let _sql = "SELECT * FROM ?? WHERE ? like ? "
	return query(_sql, [table, field, str, start, end])
}

let insertData = function(table, values) {
	let _sql = "INSERT INTO ?? SET ?"
	return query(_sql, [table, values])
}

let updateData = function(table, values, id) {
	let _sql = "UPDATE ?? SET ? WHERE id = ?"
	return query(_sql, [table, values, id])
}

let deleteDataById = function(table, id) {
	let _sql = "DELETE FROM ?? WHERE id = ?"
	return query(_sql, [table, id])
}

module.exports = {
	excute,
	findDataByFilter
}
