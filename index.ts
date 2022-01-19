// ESM
import Fastify from 'fastify'
import helloWorldRoutes from './routes/helloWorld'

const fastify = Fastify({ logger: true })

// .register is how we use routes in other files and external plugins (everything is considered a plugin in Fastify world)
fastify.register(helloWorldRoutes)

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
