export class User {
  siteId: String;
  userId: String;
  firstName: String;
  middleName: String = '';
  lastName: String;
  email: String;
  password: String;
  dateCreated: Date = new Date();
}
