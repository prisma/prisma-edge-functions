import { PrismaClient } from "@prisma/client/edge";
import { log } from 'next-axiom'
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more: 
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

prisma.$use(async (params, next) => {
  const before = Date.now()

  const result = await next(params)

  const after = Date.now()

  log.info(`Query ${params.model}.${params.action} took ${after - before}ms`)

  return result
})

export default prisma