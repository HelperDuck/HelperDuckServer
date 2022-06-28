import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllRequests() {
  try {
    const requests = await prisma.helpRequest.findMany();
    return requests;
  } catch (err) {
    console.log('Error at Model-getAllRequests', err);
    return null;
  }
}

// export async function createRequest(requestData: Request) {
//   try {
//     const request = await prisma.request.create({
//       data: requestData,
//     });
//     return request;
//   } catch (err) {
//     console.log('Error at Model-createRequest', err);
//     return null;
//   }
// }
