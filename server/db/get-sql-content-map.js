const fs = require('fs')
const getSqlMap = require('./get-sql-map')

let sqlContentMap = {}

/**
 * 读取sql文件内容
 * @param {string} fileName 文件名
 * @param {sting} path 文件路径
 * @return {string} 脚本文件内容 
 */
function getSqlContent(fileName, path) {
	let content = fs.readFileSync(path, 'binary') //同步，二进制读取
	sqlContentMap[fileName] = content
}

/**
 * sql脚本内容集合,
 * @return object
 */
function getSqlContentMap() {
	let sqlMap = getSqlMap()
	for(let key in sqlMap) {
		getSqlContent(key, sqlMap[key])
	}
	return sqlContentMap
}

module.exports = getSqlContentMap