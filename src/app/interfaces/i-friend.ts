export interface IFriend {
  userId: number,
  friendUserId: number,
  friendNickname: string,
  friendImage: string,
  friendshipStatus: number,
  newMessagesCount?: number
}
