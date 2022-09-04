import { Provide, Inject } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { RedisService } from '@midwayjs/redis';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { Utils } from '../utils';
import { LoginReturnInfoType } from '../interface';

@Provide()
export class LoginService {
  @Inject()
  utils: Utils;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  redisService: RedisService;

  // login
  async login(
    username: string,
    password: string
  ): Promise<LoginReturnInfoType> {
    const user = await this.userModel.findOne({
      where: {
        username: username,
      },
    });
    if (isEmpty(user)) {
      return null;
    }
    const comparePassword = this.utils.md5(`${password}`);
    if (user!.password !== comparePassword) {
      return null;
    }
    const uuid = this.utils.generateUUID();
    // 设置过期时间，单位秒
    await this.redisService.set('token', uuid, 'EX', 60 * 5);
    return {
      userId: user.id,
      username: user.username,
      token: uuid,
    };
  }
}
