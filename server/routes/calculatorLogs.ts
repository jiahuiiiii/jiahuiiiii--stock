import z from 'zod'

import forge from '../forge'

const valueAndScoreSchema = z.record(
  z.string(),
  z.object({
    value: z.number().optional(),
    score: z.number()
  })
)

export const list = forge
  .query()
  .description('List all calculator logs')
  .input({})
  .callback(async ({ pb }) => {
    return pb.getFullList
      .collection('calculator_logs')
      .sort(['-date'])
      .execute()
  })

export const create = forge
  .mutation()
  .description('Create a new calculator log')
  .input({
    body: z.object({
      ticker: z.string(),
      name: z.string().optional().default(''),
      exchange: z.string().optional().default(''),
      date: z.string(),
      values_and_scores: valueAndScoreSchema,
      total_score: z.number()
    })
  })
  .callback(async ({ pb, body }) =>
    pb.create.collection('calculator_logs').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update a calculator log')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: z.object({
      ticker: z.string().optional(),
      name: z.string().optional(),
      exchange: z.string().optional(),
      date: z.string().optional(),
      values_and_scores: valueAndScoreSchema.optional(),
      total_score: z.number().optional()
    })
  })
  .existenceCheck('query', {
    id: 'calculator_logs'
  })
  .callback(async ({ pb, body, query }) =>
    pb.update.collection('calculator_logs').id(query.id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a calculator log')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'calculator_logs'
  })
  .callback(async ({ pb, query }) =>
    pb.delete.collection('calculator_logs').id(query.id).execute()
  )

export const clearAll = forge
  .mutation()
  .description('Delete all calculator logs')
  .input({})
  .callback(async ({ pb }) => {
    const logs = await pb.getFullList.collection('calculator_logs').execute()

    for (const log of logs) {
      await pb.delete.collection('calculator_logs').id(log.id).execute()
    }

    return { deleted: logs.length }
  })
