import {Multimedia} from '../../../../shared/domain/multimedia';

export abstract class BookBase {
  id: String;
  title: String;
  description: String = '';
  story: String = '';
  multimedias: Array<Multimedia> = [];
  dateCreated: Date = new Date();
}
