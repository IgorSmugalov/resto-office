import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

const defaultUser = {
  email: 'user@example.com',
  roles: ['owner'],
  activated: true,
}

const hashPassword = async (password: string) =>
  await argon2.hash(password, {
    type: argon2.argon2i,
  })
const seed = async () => {
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    // @ts-ignore
    create: { ...defaultUser, password: await hashPassword('123456') },
    // @ts-ignore
    update: { ...defaultUser, password: await hashPassword('123456') },
  })
}

seed()
  .then(() => console.log(`DB successfully seeded`))
  .catch((err) => console.log(err))
  .finally(async () => await prisma.$disconnect())
