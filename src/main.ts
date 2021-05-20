import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { join } from 'path';

const logger = new Logger('Main');
const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'app',
    url: '0.0.0.0:50051',
    protoPath: join(__dirname, '../src/protos/index.proto'),
    loader: {
      includeDirs: [join(__dirname, '..', 'protos')],
    },
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  await app.listen(() => {
    logger.log('Microservice is listening...');
  });
}

bootstrap();
