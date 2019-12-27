const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const respond = require('koa-respond');
// const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const compress = require('koa-compress');
const log4js = require('log4js');


const { CryptoUrl } = require('./middleware/crypto')
const log4_config = require('./config/log4.config')
const Log4Logger = require("./middleware/logger")

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3009;
const server = require('http').Server(app.callback());

require('./router')(router);
require('./chat')(server);
log4js.configure(log4_config)
const logger = log4js.getLogger('default')

app
    .use(cors())
    .use(Log4Logger(log4js.getLogger('http'), { level: 'auto' }))
	// .use(logger())
	.use(compress({ threshold: 2048 }))
    .use(bodyParser())
    // .use(CryptoUrl)
    .use(helmet())
    .use(respond())
    .use(router.routes())
    .use(router.allowedMethods())

	.use(serve(path.join(process.cwd(), 'build')));

server.listen(port, () => {
    logger.info('The server is running at:')
	logger.info(`    - Local:  http://localhost:${port}`);
});
