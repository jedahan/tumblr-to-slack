'use strict'

const koa = require('koa')
const router = require('koa-router')()
const body = require('koa-body')()
const request = require('thunkify')(require('request'))

router.post('/random', body, function *() {
  const tumblrUrl = `http://api.tumblr.com/v2/blog/monogifs.tumblr.com/posts/photo?api_key=${process.env.TUMBLR_API_KEY}&limit=4&offset=${Math.floor(Math.random() * 10)}`
  let [_, body] = yield request(tumblrUrl)
  const url = JSON.parse(body).response.posts[0].photos[0].alt_sizes[2].url
  this.body = {
    'response_type': 'in_channel',
    'text': url
  }
})

const app = koa()
app.use(router.routes())

app.listen(process.env.PORT || 6666, function () {
  const key = this._connectionKey.split(':')
  const port = key[key.length - 1]
  return console.log(`[${process.pid}] listening on :${port}`)
})
