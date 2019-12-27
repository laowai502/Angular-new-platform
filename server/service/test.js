const TestModel = require('../model/test')

class TestService {
	async getTestList() {
		const data = await TestModel.getTestList()
		return {
			data
		}
	}
	async getDataFromSql() {
		const data = await TestModel.getDataFromSql()
		return {
			data
		}
	}
	async getTestJsonFile() {
		return await TestModel.getTestJsonFile()
	}
}

module.exports = new TestService()
