import fastifyPlugin from 'fastify-plugin'
import fastifyMongodb from 'fastify-mongodb'

async function dbConnector (fastify: any, options: any) {
  fastify.register(fastifyMongodb, {
    url: 'mongodb://localhost:27017/test'
  })
}

// Wrapping the connector with the fastify plugin gives us extra stuff. Not sure what stuff yet.
export default fastifyPlugin(dbConnector)
