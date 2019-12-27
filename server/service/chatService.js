const chatModel = require('../model/chatModel')

class ChatService {
	async loginService(params) {
		return await chatModel.login(params)
	}
	async logoutService(params) {
		return await chatModel.logout(params)
	}
	async getUserInfoService(params) {
		return await chatModel.getUserInfo(params)
	}
}

module.exports = new ChatService()
