export interface Identity {
  getUsername: () => string;
  getAuthCredentialsId: () => string;
}

export interface IRequest {
  user: Identity;
}
