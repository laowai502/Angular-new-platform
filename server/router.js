const testCtrl = require('./controller/test');
const testDBCtrl = require('./controller/testDBCtrl');
const HttpMergeCtrl = require('./controller/testHttpMergeCtrl');
const fsmCtrl = require('./controller/fsmCtrl');
const chatCtrl = require('./controller/chatCtrl');
const busboy = require('koa-busboy')
const path = require('path')

const uploader = busboy({
    dest: path.join(__dirname,'./static/upload'),
    fnDestFilename: (fieldname, filename) => Date.now() + fieldname + filename
  })

module.exports = (router) => {
    router.prefix('/api/middleware');
	router
		.get('/getTestList', testCtrl.getTestList)
		.get('/getTestJsonFile', testCtrl.getTestJsonFile)
		.post('/getDataByDB', testCtrl.getDataByDB)
		.post('/getDataByDB_GET', testCtrl.getDataByDB)
		.get('/getHttpData', HttpMergeCtrl.getHttpData)
        .get('/getMuliteAPIs', HttpMergeCtrl.getMuliteAPIs)
        .get('/getDataFromSql', testDBCtrl.getDataFromSql)
        .post('/updateDataFromSql', testDBCtrl.updateDataFromSql)
        .post('/insertDataToSql', testDBCtrl.insertDataToSql)
        .post('/deleteDataFromSql', testDBCtrl.deleteDataFromSql)
        .post('/upload', uploader, fsmCtrl.fsmUpload)
        .post('/chat/login', chatCtrl.login)
        .post('/chat/logout', chatCtrl.logout)
        .get('/chat/getUserInfo', chatCtrl.getUserInfo)
}
