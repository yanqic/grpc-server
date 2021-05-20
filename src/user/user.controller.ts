import { UserService } from '../user/user.service';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface QueryDto {
  userid: number; // Add these
}
interface UserInfo {
  userid: number;
  name: string;
  sex: number;
}

@Controller('user')
export class UserController {
  private logger = new Logger('UsersController');
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserController', 'GetUserInfo') // 参数可省略
  getUserInfo(query: QueryDto, metadata: any): UserInfo {
    this.logger.log(
      'Adding ' + query.userid.toString() + ',metadata:',
      metadata,
    );
    return this.userService.getList(query.userid);
  }
}
