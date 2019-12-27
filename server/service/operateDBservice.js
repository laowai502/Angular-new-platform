const OperaDBModel = require('../model/operateDB')

class OperaDBService {
	async queryByFilter() {
		return await OperaDBModel.queryByFilter()
	}
	async getDataFromSql() {
		return await OperaDBModel.getDataFromSql()
	}
	async updateDataFromSql(params) {
		return await OperaDBModel.updateDataFromSql(params)
	}
	async insertDataToSql(params) {
		return await OperaDBModel.insertDataToSql(params)
	}
	async deleteDataFromSql(params) {
		return await OperaDBModel.deleteDataFromSql(params)
	}
}

module.exports = new OperaDBService()
