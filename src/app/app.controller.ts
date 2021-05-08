import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';

interface INumberArray {
  data: number[]; // Add these
}
interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('AppController', 'Accumulate') // 参数可省略
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this.logger.log(
      'Adding ' + numberArray.data.toString() + ',metadata:',
      metadata,
    );
    return { sum: this.appService.accumulate(numberArray.data) };
  }
}
