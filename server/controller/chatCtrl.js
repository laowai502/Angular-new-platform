
const chatservice = require('../service/chatservice')

class ChatCtrl {
	async login(ctx) {
        const _data = await chatservice.loginService(ctx.request.body)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
	async logout(ctx) {
        const _data = await chatservice.logoutService(ctx.request.body)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
	async getUserInfo(ctx) {
        const _data = await chatservice.getUserInfoService(ctx.request.query)
		ctx.body = {
			data: _data,
			status: 200,
			message: 'Ok'
		}
	}
}
module.exports = new ChatCtrl()
