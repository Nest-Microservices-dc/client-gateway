import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {

  const clientLogger = new Logger('client-gateway');
  const natsLogger = new Logger('nats-server');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );

   app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.port);

  clientLogger.log(`Client Gateway is running on port ${envs.port}`);
  natsLogger.log(`Nats Server Running on: ${envs.natsServers}`);

}
bootstrap();
