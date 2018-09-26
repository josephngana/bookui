export class User {
  siteId: string;
  userId: string;
  firstName: string;
  middleName: string = '';
  lastName: string;
  email: string;
  password: string;
  dateCreated: Date = new Date();
}
