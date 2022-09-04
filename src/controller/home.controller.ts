import { Controller, Get } from '@midwayjs/decorator';
import { NOAUTH_PREFIX_URL } from './base';

@Controller(`${NOAUTH_PREFIX_URL}`)
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
