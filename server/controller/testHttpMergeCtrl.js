const HttpMergeService = require('../service/httpMergeService')

class HttpMergeCtrl {
	async getHttpData(ctx) {
		const _data = await HttpMergeService.queryNICarTree()
		ctx.body = {
			data: _data.data,
			status: 200,
			message: 'Ok'
		}
	}
	async getMuliteAPIs(ctx) {
		const data_eins = await HttpMergeService.queryAPI_Eins()
		const data_zwei = await HttpMergeService.queryAPI_Zwei()
		const data_drei = await HttpMergeService.queryAPI_Drei()
		
		ctx.body = {
			data: {
				weather: data_eins,
				video: data_zwei,
				music: data_drei
			},
			status: 200,
			message: 'Ok'
		}
	}
}

module.exports = new HttpMergeCtrl()