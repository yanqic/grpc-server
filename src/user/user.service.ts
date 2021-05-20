import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getList(userid: number) {
    return {
      userid,
      name: 'tom',
      sex: 1,
    };
  }
}
