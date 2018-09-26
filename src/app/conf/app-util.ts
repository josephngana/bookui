import {UUID} from 'angular2-uuid';
import {Md5} from 'ts-md5/dist/md5';

/**
 * @author caniksea
 *
 * Application Utility
 */
export class AppUtil {

  static getId(): string {
    return Md5.hashStr(UUID.UUID()).toString();
  }
}
