import { Provide, Inject } from '@midwayjs/decorator';
import { GetUserType, CreateUserType } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { Utils } from '../utils';

@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  utils: Utils;

  // save
  async saveUser(params: CreateUserType) {
    const { username, email, phone } = params;
    // create a entity object
    const user = new User();
    user.uid = this.utils.generateUUID();
    user.username = username || 'yiyi';
    user.phone = phone;
    user.email = email;

    // save entity
    await this.userModel.insert(user);

    // save success
    console.log('photo id = ', user.uid);
  }

  // get
  async getUser(options: GetUserType) {
    const res = this.userModel.find();
    return res;
  }
}
