export default async function routes(fastify: any, options: any) {
  const collection = fastify.mongo.db.collection('fastify')
  fastify.get('/', async (request: any, reply: any) => {
    const result = await collection.find().toArray()
    if (result.length === 0) {
      throw new Error('No documents found')
    }
    return result
  })

  fastify.get('/animals/:animalId', async (request: any, reply: any) => {
    const result = await collection.findOne({ animal: request.params.animalId })
    if (!result) {
      throw new Error('Invalid value')
    }
    return result
  })

  // oooo built in validation =)
  const animalBodyJsonSchema = {
    type: 'object',
    required: ['animal'],
    properties: {
      animal: { type: 'string' },
    },
  }

  const schema = {
    body: animalBodyJsonSchema,
  }

  // can attach schemas to our routes!!
  fastify.post('/animals', { schema }, async (request: any, reply: any) => {
    // we can use the `request.body` object to get the data sent by the client
    const result = await collection.insertOne({ animal: request.body.animal })
    return result
  })
}
