import { Prisma, PrismaClient, Review } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllHelpReviews() {
  try {
    const helpReviews = await prisma.review.findMany({
      include: {
        user: true,
        helpOffer: true,
        helpRequest: true,
      },
    });
    return helpReviews;
  } catch (err) {
    console.log('Error at Model-getAllHelpReviews', err);
    return null;
  }
}

export async function createHelpRequestReview(helpReviewData: any) {
  try {
    const helpReview = await prisma.review.create({
      data: {
        user: { connect: { id: helpReviewData.userId ? parseInt(helpReviewData.userId) : undefined } },
        // helpOffer: { connect: { id: helpReviewData.helpOfferId ? parseInt(helpReviewData.helpOfferId) : undefined } },
        helpRequest: {
          connect: { id: helpReviewData.helpRequestId ? parseInt(helpReviewData.helpRequestId) : undefined },
        },
        rating: parseInt(helpReviewData.rating),
        comment: helpReviewData.comment,
        role: helpReviewData.role,
      },
      include: {
        user: true,
        helpOffer: true,
        helpRequest: true,
      },
    });
    return helpReview;
  } catch (err) {
    console.log('Error at Model-createHelpReview', err);
    return null;
  }
}

export async function createHelpOfferReview(helpReviewData: any) {
  try {
    const helpReview = await prisma.review.create({
      data: {
        user: { connect: { id: helpReviewData.userId ? parseInt(helpReviewData.userId) : undefined } },
        helpRequest: {
          connect: { id: helpReviewData.helpRequestId ? parseInt(helpReviewData.helpRequestId) : undefined },
        },
        helpOffer: { connect: { id: helpReviewData.helpOfferId ? parseInt(helpReviewData.helpOfferId) : undefined } },
        rating: parseInt(helpReviewData.rating),
        comment: helpReviewData.comment,
        role: helpReviewData.role,
      },
      include: {
        user: true,
        helpOffer: true,
        helpRequest: true,
      },
    });
    return helpReview;
  } catch (err) {
    console.log('Error at Model-createHelpReview', err);
    return null;
  }
}
