const fs = require('fs')
const getSqlContentMap = require('../db/get-sql-content-map')
const { excute } = require('../db/dbUtil')

//获取所有sql脚本
let sqlMap = getSqlContentMap()

let eventLog = function(err, sqlFile, index) {
	if(err) {
		console.log(`[ERROR] sql脚本文件: ${sqlFile} 第${index + 1}条脚本执行失败`)
	} else {
		console.log(`[SUCCESS] sql脚本文件: ${sqlFile} 第${index + 1}条脚本执行成功`)
	}
}
//执行建表sql脚本
const createAllTables = async() => {
	let hasErr = false
	for(let key in sqlMap) {
		if(key !== 'clear.sql') {
			let sqlShell = sqlMap[key]
			let sqlShellList = sqlShell.split(';')
			for(const [index, shell] of sqlShellList.entries()) {
				if(shell.indexOf('--') === -1) { //去掉注释初始化脚本			
					if(shell.trim()) {
						let result = await excute(shell)
						if(result.serverStatus * 1 === 2) {
							eventLog(null, key, index)
						} else {
							hasErr = true
							eventLog(true, key, index)
						}
					}
				}
			}
		}
	}
	if(!hasErr) {
		console.log('sql脚本初始化完毕')
	} else {
		console.log('sql脚本初始化失败')
	}
	process.exit(0)
}
//删除数据和表
const deleteTableOrData = async() => {
	try {
		for (const item of sqlMap['clear.sql'].split(';')) {
			await excute(item)
		}
		console.log('以清空sql初始化脚本')
	} catch(e) {
		console.log('清空sql初始化脚本失败')
		console.log(e)
	}
	process.exit(0)
}


const isInit = process.env.SCRIPT || 's'

if (isInit === 'y') {
	createAllTables()
} else {
	deleteTableOrData()	
}

