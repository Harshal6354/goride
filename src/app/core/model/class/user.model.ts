export class user {
  userId: number = 0;
  userName: string = '';
  emailId: string = '';
  fullName: string = '';
  role: string = '';
  createDate: Date = new Date();
  password: string = '';
  projectName: string = '';
  refreshToken: string = '';
  refreshTokenExpiryTime: Date = new Date();

  constructor(init?: Partial<user>) {
    Object.assign(this, init);
  }
}
