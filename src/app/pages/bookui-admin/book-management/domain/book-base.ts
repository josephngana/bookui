export abstract class BookBase {
  id: String;
  title: String;
  description: String = '';
  story: String = '';
  dateCreated: Date = new Date();
}
