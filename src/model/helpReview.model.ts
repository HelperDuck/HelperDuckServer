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

    const updatedUser = await recalculateRating(helpReviewData.userId);

    return updatedUser;
  } catch (err) {
    console.log('Error at Model-createHelpReview', err);
    return null;
  }
}

async function recalculateRating(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        reviews: true,
      },
    });

    if (!user || !user.reviews || user.reviews.length === 0) return null;

    const reviews = user.reviews;
    let rating = 0;
    let count = 0;
    reviews.forEach((review: Review) => {
      if (review.rating) {
        rating += review.rating;
        count++;
      }
    });

    rating = rating / count;
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { rating: rating },
      include: {
        reviews: true,
        helpOffers: true,
        helpRequests: true,
      },
    });
    return updatedUser;
  } catch (err) {
    console.log('Error at Model-recalculateRating', err);
    return null;
  }
}
