import z from 'zod'

import forge from '../forge'

export const list = forge
  .query()
  .description('List all analyzer logs')
  .input({})
  .callback(async ({ pb }) => {
    return (
      await pb.getFullList.collection('analyzer_logs').sort(['-date']).execute()
    ).map(log => ({
      ...log,
      values: log.values as Record<string, number | string>,
      scores: log.scores as Record<string, number>,
      quantitative: log.quantitative as Record<string, boolean>
    }))
  })

export const create = forge
  .mutation()
  .description('Create a new analyzer log')
  .input({
    body: z.object({
      ticker: z.string(),
      stock_exchange: z.string().optional().default(''),
      company_name: z.string().optional().default(''),
      date: z.string(),
      values: z.record(z.string(), z.union([z.number(), z.string()])),
      scores: z.record(z.string(), z.number()),
      quantitative: z.record(z.string(), z.boolean())
    })
  })
  .callback(async ({ pb, body }) =>
    pb.create.collection('analyzer_logs').data(body).execute()
  )

export const update = forge
  .mutation()
  .description('Update a analyzer log')
  .input({
    query: z.object({
      id: z.string()
    }),
    body: z.object({
      ticker: z.string().optional(),
      stock_exchange: z.string().optional(),
      company_name: z.string().optional(),
      date: z.string().optional(),
      values: z
        .record(z.string(), z.union([z.number(), z.string()]))
        .optional(),
      scores: z.record(z.string(), z.number()).optional(),
      quantitative: z.record(z.string(), z.boolean()).optional()
    })
  })
  .existenceCheck('query', {
    id: 'analyzer_logs'
  })
  .callback(async ({ pb, body, query }) =>
    pb.update.collection('analyzer_logs').id(query.id).data(body).execute()
  )

export const remove = forge
  .mutation()
  .description('Delete a analyzer log')
  .input({
    query: z.object({
      id: z.string()
    })
  })
  .existenceCheck('query', {
    id: 'analyzer_logs'
  })
  .callback(async ({ pb, query }) =>
    pb.delete.collection('analyzer_logs').id(query.id).execute()
  )

export const clearAll = forge
  .mutation()
  .description('Delete all analyzer logs')
  .input({})
  .callback(async ({ pb }) => {
    const logs = await pb.getFullList.collection('analyzer_logs').execute()

    for (const log of logs) {
      await pb.delete.collection('analyzer_logs').id(log.id).execute()
    }

    return { deleted: logs.length }
  })
