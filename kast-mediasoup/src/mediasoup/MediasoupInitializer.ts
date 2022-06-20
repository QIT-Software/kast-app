import IMediasoup from './IMediasoup';
import Mediasoup from './Mediasoup';
import MediasoupConfig from 'mediasoup/MediasoupConfig';
import {mediaCodecs} from 'config/MediaCodecs';
import {initialAvailableOutgoingBitrate} from 'config/InitialAvailableOutgoingBitrate';
import {TransportListenIp} from 'mediasoup/lib/types';
import {IConfigService} from '@spryrocks/config-node';
import WorkerConfig from 'mediasoup/WorkerConfig';

export const initializeMediasoup = async (
  configService: IConfigService,
): Promise<IMediasoup> => {
  const listenIps: Array<TransportListenIp> = [
    {
      ip: configService.get('LISTEN_IP'),
      announcedIp: configService.getOptional('ANNOUNCED_IP'),
    },
  ];

  const config: MediasoupConfig = {
    mediaCodecs,
    initialAvailableOutgoingBitrate,
    listenIps,
  };
  const mediasoup = new Mediasoup(config);

  const workerConfig: WorkerConfig = {
    rtcMinPort: configService.getNumber('RTC_MIN_PORT'),
    rtcMaxPort: configService.getNumber('RTC_MAX_PORT'),
  };

  await mediasoup.createWorker(workerConfig);
  return mediasoup;
};
