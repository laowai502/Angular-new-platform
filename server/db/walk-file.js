const fs = require('fs')

/**
 * @param {stirng} pathResolve 文件绝对路径
 * @param {string} mime 文件后缀名
 * @return 返回 key-文件名, value-文件路径的 键值对数组
 */
const walkFile = function(pathResolve, mime) {
	let files = fs.readdirSync(pathResolve)

	let fileList = {}

	for(let [i, item] of files.entries()) {
		let itemArr = item.split('\.')

		let itemMime = (item.length > 1) ? itemArr[itemArr.length - 1] : 'undefined'
		let keyName = item + ''
		if(mime === itemMime) {
			fileList[item] = pathResolve + item
		}
	}
	return fileList
}

module.exports = walkFile