import { ServerPlugin, ServerConfig } from 'vite'
import { IKoaProxiesOptions } from 'koa-proxies-router'
import { URL } from 'url'

type ServerConfigExtend = ServerConfig & {
  proxies?: Record<string, string | IKoaProxiesOptions>
}

export const proxyPlugin: ServerPlugin = ({ app, config }) => {
  let configExtend: ServerConfigExtend = config
  if (!configExtend.proxies) {
    return
  }

  const debug = require('debug')('vite:proxy')
  const proxy = require('koa-proxies-router')
  const options = configExtend.proxies
  Object.keys(options).forEach((path) => {
    let opts = options[path]
    if (typeof opts === 'string') {
      opts = { target: opts }
    }
    opts.logs = (ctx, target) => {
      debug(
        `${ctx.req.method} ${(ctx.req as any).oldPath} proxy to -> ${new URL(
          ctx.req.url!,
          target
        )}`
      )
    }
    app.use(proxy(path, opts))
  })
}
