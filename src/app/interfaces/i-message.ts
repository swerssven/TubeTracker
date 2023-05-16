export interface IMessage {
  messagesId?: number,
  senderUserId: number,
  receiverUserId: number,
  receiverImage?: string,
  receiverName?: string,
  content: string,
  creationDate?: Date,
  isRead?: boolean
}

export interface IMessageDto{
  messagesList: IMessage[],
  senderImage: string,
  receiverImage: string,
  receiverName: string
}
