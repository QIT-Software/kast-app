import {NestFactory} from '@nestjs/core';
import {AppModule} from './AppModule';
import {createConfigService, getConfigEnv} from '@spryrocks/config-node';
import {TcpOptions, Transport} from '@nestjs/microservices';

export async function initApplication() {
  const configService = createConfigService(getConfigEnv(), undefined);

  const tcpHost = configService.get('TCP_HOST');
  const tcpPort = configService.getNumber('TCP_PORT');

  const app = await NestFactory.createMicroservice<TcpOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: tcpHost,
      port: tcpPort,
    },
  });
  await app.listenAsync();
}
