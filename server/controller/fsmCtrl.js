
class FsmCtrl {
	async fsmUpload(ctx) {
        let fileReadStream = ctx.request.files[0]
        ctx.body = {
			data: fileReadStream.path,
			status: 200,
			message: 'Ok'
		}
    }
}

module.exports = new FsmCtrl()
