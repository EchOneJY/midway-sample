import { Provide } from '@midwayjs/decorator';

@Provide()
export class Utils {
  /**
   * 生成一个UUID
   */
  generateUUID(): string {
    return Math.floor(Math.random() * 900 + 100).toString();
  }
}
