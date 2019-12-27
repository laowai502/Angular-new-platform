
const OperaDBService = require('../service/operateDBservice')

class TestDBCtrl {
	async getDataFromSql(ctx) {
        const _data = await OperaDBService.getDataFromSql()
        ctx.log.info(_data)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
	async updateDataFromSql(ctx) {
        const _data = await OperaDBService.updateDataFromSql(ctx.request.body)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
	async insertDataToSql(ctx) {
        const _data = await OperaDBService.updateDataFromSql(ctx.request.body)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
	async deleteDataFromSql(ctx) {
        const _data = await OperaDBService.deleteDataFromSql(ctx.request.body)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
}

module.exports = new TestDBCtrl()
