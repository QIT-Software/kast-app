import { types } from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import Producer from './Producer';
import Consumer from './Consumer';
import { MediaKind } from 'entities/Mediasoup';
import Transport from 'mediasoup/Transport';
export default class WebRtcTransport extends Transport {
    private readonly instance;
    constructor(mediasoup: IMediasoupInternal, instance: types.WebRtcTransport);
    get iceCandidates(): types.IceCandidate[];
    get iceParameters(): types.IceParameters;
    get dtlsParameters(): types.DtlsParameters;
    createProducer(transportId: string, rtpParameters: types.RtpParameters, mediaKind: MediaKind, appData: object): Promise<Producer>;
    createConsumer(producerId: string, rtpCapabilities: types.RtpCapabilities, appData: object): Promise<Consumer>;
    get dtlsState(): types.SctpState;
    get userId(): any;
    get direction(): any;
    get clientId(): any;
}
