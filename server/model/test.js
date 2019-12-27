class TestModel {
	async getTestList() {
		// Similar: return await query('select * from user where uid = ?', uid);
		return await [
			{
				id: '10001',
				name: 'middleware_eins',
				description: '中间层测试数据1'
			},
			{
				id: '10002',
				name: 'middleware_zwei',
				description: '中间层测试数据2'
			},
			{
				id: '10003',
				name: 'middleware_drei',
				description: '中间层测试数据3'
			}
		]
	}
}

module.exports = new TestModel()
