import glob from 'glob'
import Router from 'koa-router'

exports = module.exports = function initModules (app) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) { throw err }

    matches.forEach((mod) => {
      const router = require(`${mod}/router`)

      const routes = router.default
      let baseUrl = router.baseUrl
      baseUrl = '/api' + baseUrl

      const instance = new Router({ prefix: baseUrl })

      routes.forEach((config) => {
        let {
          method = '',
          route = '',
          action
        } = config

        const validatePermissions = async (ctx, next) => {
          try {
            return next()
          } catch (err) {
            console.log('err:', err)
            ctx.body = err
            ctx.status = 500
            return ctx
          }
        }

        const manageHandlerErr = function (handler) {
          return async function (ctx, next) {
            try {
              await handler(ctx, next)
            } catch (err) {
              ctx.body = err
              ctx.status = (ctx.body.output && ctx.body.output.statusCode) || 500
            }
          }
        }

        action = [action]
        let handlers = action.map(handler => manageHandlerErr(handler))

        handlers.unshift(validatePermissions)
        const lastHandler = handlers.pop()

        instance[method.toLowerCase()](route, ...handlers, async function(ctx) {
          return await lastHandler(ctx)
        })

        app
          .use(instance.routes())
          .use(instance.allowedMethods())
      })
    })
  })
}
