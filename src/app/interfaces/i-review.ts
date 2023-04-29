export interface IReview {
  userId: number,
  userNickname: string,
  userImage: string,
  movieApiId?: number,
  serieApiId?: number,
  content: string,
  creationDate: Date
}

export interface IReviewDto{
  numReviews: number;
  reviews: IReview[];
}
