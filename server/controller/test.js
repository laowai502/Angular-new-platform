const TestService = require('../service/test')
const OperaDBService = require('../service/operateDBservice')
const excute =  require('../db/dbUtil')

class TestCtrl {
	async getTestList(ctx) {
		const res = await TestService.getTestList()
		ctx.body = {
			status: 200,
			data: res.data,
			message: ''
		}
	}
	async getTestJsonFile(ctx) {
		const res = await TestService.getTestJsonFile()
		ctx.body = res
	}
	async getDataByDB(ctx) {
		const { field, value } = ctx.request.method === 'POST' ? ctx.request.body : ctx.request.query	//bodyParser插件
		const res = await OperaDBService.queryByFilter()
		ctx.body = {
			status: 200,
			data: res,
			message: ''
		}
	}
	async getDataFromSql(ctx) {
        await excute.excute('SELECT * FROM koa_test_mysql')
            .then(data => {
                ctx.body = {
                    status: 200,
                    data: data,
                    message: ''
                }
            })
            .catch(err => {
                console.log(err)
            })
	}
	async updateDataFromSql(ctx,params) {
        // let sql = 'UPDATE koa_test_mysql SET name=params.name,'
        await excute.excute('SELECT * FROM koa_test_mysql')
            .then(data => {
                ctx.body = {
                    status: 200,
                    data: data,
                    message: ''
                }
            })
            .catch(err => {
                console.log(err)
            })
	}
}

module.exports = new TestCtrl()
