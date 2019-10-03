import { Injectable } from '@nestjs/common';
import * as lodash from 'lodash';
import * as UUID from 'uuid/v4';
import * as Momemt from 'moment';
import * as Crypto from 'crypto-js';
import * as jwt from '@nestjs/jwt';
@Injectable()
export class HelperService {
  omit(object: any, keysToOmit: string[]) {
    return lodash.omit(object, keysToOmit);
  }

  generateUUID() {
    return UUID();
  }

  addHours(hour: number): Date {
    return Momemt()
      .add(hour, 'hours')
      .toDate();
  }

  getRandomKeys(): string {
    return Crypto.lib.WordArray.random(32).toString();
  }
}
