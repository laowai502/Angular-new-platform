const crypto = require('crypto.js')

const key = 'lao@wai_!643399Z7dwWEAC'
const prefix = '/api/middleware/'

const CryptoUrl = async (ctx, next) => {
    const url =  ctx.request.url
    if(url !== '/api/middleware/upload') {
        let path = url.replace(prefix, '').split('?')[0]
        let query
        if(ctx.request.method === 'POST') {
            query = ctx.request.body.POST_QUERY
            ctx.request.body = getQuery(query)
            ctx.request.url = prefix + crypto.decipher('aes-128-cbc', path, key, 'hex')
        } else if(ctx.request.method === 'GET') {
            query = crypto.decipher('aes-128-cbc', ctx.request.query.GET_QUERY, key, 'hex')
            ctx.request.query =  getQuery(ctx.request.query.GET_QUERY)
            ctx.request.url = prefix + crypto.decipher('aes-128-cbc', path, key, 'hex') + '?' + query
        }
    }
	await next()
}

function getQuery(query) {
    let obj = {}
    if(query) {
        query = crypto.decipher('aes-128-cbc', query, key, 'hex')
        const ary = query.split('&')
        ary.forEach(element => {
            let keys = element.split('=')
            let attr = keys[0]
            obj[attr] = keys[1]
        });
    }
    return obj
}

module.exports = {
	CryptoUrl
}
