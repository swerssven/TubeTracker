export interface IMessage {
  senderUserId: number,
  receiverUserId: number,
  content: string,
  creationDate: Date,
  isRead: boolean
}
