const { excute } = require('../db/dbUtil')
let userInfo = {}

class ChatModel {
	async login(params) {
        // const _sql =
        // `update koa_test_mysql set
        // name="${params.name}",
        // city="${params.city}",
        // carNumber="${params.carNumber}",
        // tel="${params.tel}" where id=${params.id}
        // `
        // const res = await excute(_sql)
        userInfo = params
		return  { userId: params.username }
	}
	async logout(params) {
        // const _sql = `delete from koa_test_mysql where id=${params.id}`
        // const res = await excute(_sql)
		return  null
	}
	async getUserInfo(params) {
        // const _sql = `delete from koa_test_mysql where id=${params.id}`
        // const res = await excute(_sql)
        userInfo.userId = params.userId
		return  userInfo
	}
}

module.exports = new ChatModel()
