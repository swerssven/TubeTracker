export interface IComment {
  postId: number,
  userId: number,
  userImage?: string,
  userNickname?: string,
  content: string,
  creationDate?: Date,
  dateString?: string
}
