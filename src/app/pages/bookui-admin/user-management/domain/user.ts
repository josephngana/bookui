export class User {
  siteId: string;
  siteName: string;
  userId: string;
  firstName: string;
  middleName: string = '';
  lastName: string;
  email: string;
  password: string = '';
  dateCreated: Date = new Date();
}
