import {Multimedia} from '../../../../shared/domain/multimedia';

export abstract class BookBase {
  id: string;
  title: string;
  description: string = '';
  story: string = '';
  multimedias: Array<Multimedia> = [];
  dateCreated: Date = new Date();
}
