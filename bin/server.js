import Koa from 'koa';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';

import config from '../config'

import datasources from '../config/datasources';
import { errorMiddleware } from '../src/middleware/error'
import { ensureUser } from '../src/middleware/auth'
import { queryParserMiddleware } from '../src/middleware/queryParser'
import { boot } from '../boot'

const app = new Koa()
mongoose.Promise = global.Promise;
mongoose.connect(datasources[0].url, (err, db) => {
  console.log('MongoDB:', err || 'Connected correctly to server')
})

app.use(cors(config.cors))
app.use(logger())
app.use(bodyParser())
app.use(errorMiddleware())

app.use(queryParserMiddleware())
app.use(ensureUser)

const modules = require('../src/modules')
modules(app)
boot()

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`)
})

export default app
