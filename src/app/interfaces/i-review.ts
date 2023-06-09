export interface IReview {
  movieReviewId?: number,
  serieReviewId?: number,
  userId: number,
  userNickname: string,
  userImage: string,
  movieApiId?: number,
  serieApiId?: number,
  content: string,
  creationDate: Date
  rating?: number
}

export interface IReviewDto{
  numReviews: number;
  reviews: IReview[];
}
