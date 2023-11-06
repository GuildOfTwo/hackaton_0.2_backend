const { PrismaClient } = require('@prisma/client')

const globalForPrisma = global || window
const prisma = globalForPrisma.prisma || new PrismaClient()
if (!globalForPrisma.prisma) globalForPrisma.prisma = prisma

module.exports = { prisma }
