import {RtpCodecCapability, TransportListenIp} from 'mediasoup/lib/types';

export default interface MediasoupConfig {
  mediaCodecs: Array<RtpCodecCapability>;
  initialAvailableOutgoingBitrate: number;
  listenIps: Array<TransportListenIp>;
}
