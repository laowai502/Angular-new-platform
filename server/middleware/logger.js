const log4js = require('log4js')
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

const log4_config = require('../config/log4.config')

module.exports = (logger,options) => {
    const contextLogger = {}
    let level = options.level || 'info'
    log4js.configure(log4_config)
    return async (ctx, next) => {
      const start = Date.now()
      const { method, url, host } = ctx.request;
      const client = { method, url, host}
      methods.forEach((method, i) => {
        contextLogger[method] = (message) => {
            log4js.getLogger('watchLogger')[method](JSON.stringify(Object.assign(message, client)))
        }
      })
      ctx.log = contextLogger;
      await next()
      if (options.level === 'auto') {
        level = 'info'
        if (ctx.res.statusCode >= 300) level = 'warn'
        if (ctx.res.statusCode >= 400) level = 'error'
      } else {
        level = 'info'
      }
      const responseTime = Date.now() - start;
      logger[level](JSON.stringify(Object.assign({
        responseTime: `响应时间为${responseTime/1000}s`
      }, client)))
    }
  }
