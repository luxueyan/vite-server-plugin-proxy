# vite-server-plugin-proxy ⚡

[![npm][npm-img]][npm-url]
[![node][node-img]][node-url]

This plugin support router config like [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware/)

## Status

In rc.1 and will likely release 1.0 soon.

## Getting Started

### Install (yarn or npm)

`yarn add vite-server-plugin-proxy` or `npm i vite-server-plugin-proxy`

### Usage

Example:

```js
// vite.config.js
const defaultProxy = 'http://localhost:3000'
module.exports = {
  proxies: {
    '/api': {
      target: defaultProxy,
      proxyTimeout: 1500000,
      timeout: 1500000,
      changeOrigin: true,
      router: function (req) {
        if (req.query._proxy) {
          const proxyTarget = req.query._proxy
          return proxyTarget
        }

        console.log(req.path, `: proxy to ${defaultProxy}`)
        return defaultProxy
      },
    }
  }
}
```

## License

MIT

[npm-img]: https://img.shields.io/badge/npm-v1.0.0--rc.1-green.svg
[npm-url]: https://npmjs.com/package/vite-transform-globby-import
[node-img]: https://img.shields.io/node/v/vite.svg
[node-url]: https://nodejs.org/en/about/releases/

<!-- [unix-ci-img]: https://circleci.com/gh/vitejs/vite.svg?style=shield
[unix-ci-url]: https://app.circleci.com/pipelines/github/vitejs/vite
[windows-ci-img]: https://ci.appveyor.com/api/projects/status/0q4j8062olbcs71l/branch/master?svg=true
[windows-ci-url]: https://ci.appveyor.com/project/yyx990803/vite/branch/master -->
