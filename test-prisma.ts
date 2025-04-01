import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Prisma Connected');
  } catch (error) {
    console.error('❌ Prisma Connection Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
