import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import pino from 'express-pino-logger'
import { Options as PinoOptions } from 'pino-http'

import { port, mongoUri } from './config'
import db from './db'
import logger from './logger'
import { typeDefs, resolvers, extensions, dataSources } from './GraphQL'

db.openUri(mongoUri, { useNewUrlParser: true, useFindAndModify: false })

db.on('error', error => {
  logger
    .child({
      category: 'DATABASE_ERROR',
      action: 'initializing server',
      error
    })
    .error('Something went wrong while connecting to the database...')
  process.exit(99)
})

db.once('open', () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context: ({ req, res }) => ({ req, res }),
    extensions
  })

  const app = express()
  app.use(
    pino(<PinoOptions>{
      logger,
      customLogLevel: ({ statusCode }, err) =>
        err || statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info'
    })
  )
  // This is the same as res.setHeader('cache-control', 'no-store') || next()
  app.use(
    (_, res, next) => (res.setHeader('cache-control', 'no-store'), next())
  )

  const path = '/gql/my-cool-api'
  server.applyMiddleware({ app, path })

  app.listen({ port }, () =>
    logger.info(`🚀 Server ready at http://localhost:${port}${path}`)
  )
})
