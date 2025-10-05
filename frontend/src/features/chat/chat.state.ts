interface IChatState {
  messages: [];
  users: [];
  selectedUser: [];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
}

export type TChatState = IChatState;
