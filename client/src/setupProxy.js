import { SERVER_PATH } from './components/Config'

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: SERVER_PATH,
            changeOrigin: true,
        }),
    )
}
