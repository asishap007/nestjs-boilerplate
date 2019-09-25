import { Injectable } from '@nestjs/common';
import * as lodash from 'lodash';
import * as UUID from 'uuid/v4';

@Injectable()
export class HelperService {
  omit(object: any, keysToOmit: string[]) {
    return lodash.omit(object, keysToOmit);
  }

  generateUUID() {
    return UUID();
  }
}
