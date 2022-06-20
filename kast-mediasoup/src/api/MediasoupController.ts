import {Controller} from '@nestjs/common';
import {IMediaManager} from 'managers';
import {MessagePattern} from './enhancers';
import {
  ConnectTransportRequest,
  ConnectTransportResponse,
  CreateConsumerRequest,
  CreateConsumerResponse,
  CreateProducerRequest,
  CreateProducerResponse,
  CreateRouterRequest,
  CreateRouterResponse,
  CreateTransportRequest,
  CreateTransportResponse,
  GetProducerRequest,
  GetProducerResponse,
  GetProducersRequest,
  GetProducersResponse,
  GetRouterRequest,
  GetRouterResponse,
  StopRecordingRequest,
  StopRecordingResponse,
  StartRecordingRequest,
  StartRecordingResponse,
  MuteRequest,
  MuteResponse,
} from 'api/entities';
import {Direction, ProducerOptions} from 'entities/Mediasoup';
import {LeaveRoomRequest, LeaveRoomResponse} from 'api/entities/LeaveRoom';
import {CloseRouterRequest, CloseRouterResponse} from 'api/entities/CloseRouter';

@Controller()
export default class MediasoupController {
  constructor(private readonly roomManager: IMediaManager) {}

  @MessagePattern({area: 'router', action: 'create'})
  async createRouter(request: CreateRouterRequest): Promise<CreateRouterResponse> {
    const router = await this.roomManager.createRouter(request.roomId);
    return {
      rtpCapabilities: router.rtpCapabilities,
    };
  }

  @MessagePattern({area: 'transport', action: 'create'})
  async createTransport(
    request: CreateTransportRequest,
  ): Promise<CreateTransportResponse> {
    const transport = await this.roomManager.createTransport(
      request.roomId,
      request.userId,
      request.direction,
      request.clientId,
    );

    return {
      id: transport.id,
      dtlsParameters: transport.dtlsParameters,
      iceCandidates: transport.iceCandidates,
      iceParameters: transport.iceParameters,
    };
  }

  @MessagePattern({area: 'transport', action: 'connect'})
  async connectTransport(
    request: ConnectTransportRequest,
  ): Promise<ConnectTransportResponse> {
    await this.roomManager.connectTransport(
      request.roomId,
      request.dtlsParameters,
      request.direction as Direction,
      request.clientId,
      request.quality,
    );
  }

  @MessagePattern({area: 'producer', action: 'create'})
  async createProducer(request: CreateProducerRequest): Promise<CreateProducerResponse> {
    const producer = await this.roomManager.createProducer(
      request.roomId,
      request.transportId,
      request.clientId,
      request.userId,
      request.rtpParameters,
      request.mediaType,
      request.mediaKind,
    );
    return {
      producerId: producer.id,
      kind: producer.kind,
      rtpParameters: producer.rtpParameters,
      appData: producer.appData,
    };
  }

  @MessagePattern({area: 'consumer', action: 'create'})
  async createConsumer(request: CreateConsumerRequest): Promise<CreateConsumerResponse> {
    const consumer = await this.roomManager.createConsumer(
      request.roomId,
      request.producerId,
      request.rtpCapabilities,
      request.clientId,
      request.userId,
    );
    return {
      id: consumer.id,
      producerId: consumer.producerId,
      rtpParameters: consumer.rtpParameters,
      appData: consumer.appData,
    };
  }

  @MessagePattern({area: 'producer', action: 'get'})
  async getProducer(request: GetProducerRequest): Promise<GetProducerResponse> {
    const producer = await this.roomManager.findProducer(request.roomId, request.userId);
    if (!producer) throw new Error(`API producer has not been found`);
    return {
      id: producer.id,
      kind: producer.kind,
      rtpParameters: producer.rtpParameters,
    };
  }

  @MessagePattern({area: 'router', action: 'get'})
  async getRouter(request: GetRouterRequest): Promise<GetRouterResponse> {
    const router = await this.roomManager.findOrCreateRouter(request.roomId);
    return {
      rtpCapabilities: router.rtpCapabilities,
    };
  }

  @MessagePattern({area: 'producers', action: 'get'})
  async getProducers(request: GetProducersRequest): Promise<GetProducersResponse> {
    const producers = await this.roomManager.getProducers(request.roomId);
    if (!producers) throw new Error(`API producer has not been found`);
    return {
      producers: producers.map(
        (producer): ProducerOptions => ({
          id: producer.id,
          kind: producer.kind,
          rtpParameters: producer.rtpParameters,
          appData: producer.appData,
        }),
      ),
    };
  }

  @MessagePattern({area: 'recording', action: 'start'})
  async startRecording(request: StartRecordingRequest): Promise<StartRecordingResponse> {
    const response = await this.roomManager.startRecording(
      request.roomId,
      request.userId,
      request.recordId,
      request.producerId,
      request.audioProducerId,
    );
    if (response === undefined) throw new Error(`API recording has not been started`);
    return {
      response,
    };
  }

  @MessagePattern({area: 'recording', action: 'stop'})
  async stopRecording(request: StopRecordingRequest): Promise<StopRecordingResponse> {
    const response = await this.roomManager.stopRecording(
      request.roomId,
      request.userId,
      request.producerId,
      request.audioProducerId,
    );
    if (response === undefined) throw new Error(`API recording has not been started`);
    return {
      response,
    };
  }

  @MessagePattern({area: 'router', action: 'leave'})
  async leaveRoom(request: LeaveRoomRequest): Promise<LeaveRoomResponse> {
    const response = await this.roomManager.leaveRoom(request.roomId, request.userId);
    return {response};
  }

  @MessagePattern({area: 'router', action: 'close'})
  async closeRouter(request: CloseRouterRequest): Promise<CloseRouterResponse> {
    await this.roomManager.closeRouter(request.roomId);
    return {};
  }

  @MessagePattern({area: 'producer', action: 'mute'})
  async mute(request: MuteRequest): Promise<MuteResponse> {
    const response = await this.roomManager.muteProducer(
      request.action,
      request.roomId,
      request.userId,
      request.producerId,
    );
    return {response};
  }
}
