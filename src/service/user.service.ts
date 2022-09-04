import { Provide, Inject } from '@midwayjs/decorator';
import { GetUserType, CreateUserType } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { Utils } from '../utils';

@Provide()
export class UserService {
  @Inject()
  utils: Utils;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  // get
  async getUser(options: GetUserType) {
    const res = await this.userModel.findOne({
      where: { id: options.id },
    });
    return res;
  }

  // get list
  async getUserList() {
    const res = await this.userModel.find({});
    return res;
  }

  // add
  async addUser(params: CreateUserType): Promise<boolean> {
    const exists = await this.userModel.findOneBy({
      username: params.username,
    });
    if (!isEmpty(exists)) {
      return false;
    }
    const { username, password, remark, email, phone } = params;
    // create a entity object
    const user = new User();
    Object.assign(user, {
      username,
      password: this.utils.md5(`${password}`),
      remark,
      email,
      phone,
    });
    // save entity
    await this.userModel.save(user);
    return true;
  }

  // delete
  async deleteUser(options: GetUserType) {
    const res = await this.userModel.findOne({
      where: { id: options.id },
    });
    if (res) {
      await this.userModel.delete(options.id);
    } else {
      return false;
    }
    return true;
  }
}
