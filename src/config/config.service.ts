// tslint:disable-next-line: no-string-literal
//process.env['NODE_CONFIG_DIR'] = './src/config';

import { Injectable } from '@nestjs/common';
import * as Config from 'config';
@Injectable()
export class ConfigService {
  readonly configurations = Config;
}
