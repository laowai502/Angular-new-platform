const { excute } = require('../db/dbUtil')

class OperaDBModel {
	async queryByFilter(field, value) {
		const _sql = `
			select * from koa_test
			where "${field}" like "%${value}%"
		`
		const res = await excute(_sql)

		return  Array.isArray(res) && res.length > 0 ? res : null
	}
	async getDataFromSql() {
        const _sql = 'select * from koa_test_mysql'
        return await [
			{
				id: '10001',
				name: 'middleware_eins',
                city: '中间层测试数据1',
                carNumber: '辽B12223',
                tel: '15633232214'
			},
			{
				id: '10002',
				name: 'middleware_zwei',
                city: '中间层测试数据2',
                carNumber: '辽B12223',
                tel: '15633232214'
			},
			{
				id: '10003',
				name: 'middleware_drei',
                city: '中间层测试数据3',
                carNumber: '辽B12223',
                tel: '15633232214'
			}
		]
		// const res = await excute(_sql)
		// return  Array.isArray(res) && res.length > 0 ? res : null
	}
	async updateDataFromSql(params) {
        // const _sql =
        // `update koa_test_mysql set
        // name="${params.name}",
        // city="${params.city}",
        // carNumber="${params.carNumber}",
        // tel="${params.tel}" where id=${params.id}
        // `
        // const res = await excute(_sql)
		return  null
	}
	async insertDataToSql(params) {
        const _sql =
        `insert into koa_test_mysql
        (name,city,carNumber,tel) values
        (${params.name},${params.city},${params.carNumber},${params.carNumber},${params.tel})
        `
        const res = await excute(_sql)
		return  null
	}
	async deleteDataFromSql(params) {
        const _sql = `delete from koa_test_mysql where id=${params.id}`
        const res = await excute(_sql)
		return  null
	}
}

module.exports = new OperaDBModel()
