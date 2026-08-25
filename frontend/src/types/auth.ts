// {
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
//   "user": {
//     "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
//     "email": "user@example.com",
//     "createdAt": "2026-08-20T16:50:26.255Z"
//   }
// }

export interface IRegisterResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface IAuthResponse {
  user: IUser;
}
