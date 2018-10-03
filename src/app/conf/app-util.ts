import {UUID} from 'angular2-uuid';
import {Md5} from 'ts-md5/dist/md5';
import {HttpHeaders} from '@angular/common/http';

/**
 * @author caniksea
 *
 * Application Utility
 */
export class AppUtil {

  static getId(): string {
    return Md5.hashStr(UUID.UUID()).toString();
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
  }

  static getHttpHeaders() {
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return httpOptions;
  }
}
