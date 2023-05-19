export interface IPost {
  postId?: number,
  userId: number,
  userNickname: string,
  userImage: string,
  content: string,
  creationDate?: Date,
  dateString?: string
}
