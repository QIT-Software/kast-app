import { IMediaManager } from 'managers';
import { ConnectTransportRequest, ConnectTransportResponse, CreateConsumerRequest, CreateConsumerResponse, CreateProducerRequest, CreateProducerResponse, CreateRouterRequest, CreateRouterResponse, CreateTransportRequest, CreateTransportResponse, GetProducerRequest, GetProducerResponse, GetProducersRequest, GetProducersResponse, GetRouterRequest, GetRouterResponse, StopRecordingRequest, StopRecordingResponse, StartRecordingRequest, StartRecordingResponse, MuteRequest, MuteResponse } from 'api/entities';
import { LeaveRoomRequest, LeaveRoomResponse } from 'api/entities/LeaveRoom';
import { CloseRouterRequest, CloseRouterResponse } from 'api/entities/CloseRouter';
export default class MediasoupController {
    private readonly roomManager;
    constructor(roomManager: IMediaManager);
    createRouter(request: CreateRouterRequest): Promise<CreateRouterResponse>;
    createTransport(request: CreateTransportRequest): Promise<CreateTransportResponse>;
    connectTransport(request: ConnectTransportRequest): Promise<ConnectTransportResponse>;
    createProducer(request: CreateProducerRequest): Promise<CreateProducerResponse>;
    createConsumer(request: CreateConsumerRequest): Promise<CreateConsumerResponse>;
    getProducer(request: GetProducerRequest): Promise<GetProducerResponse>;
    getRouter(request: GetRouterRequest): Promise<GetRouterResponse>;
    getProducers(request: GetProducersRequest): Promise<GetProducersResponse>;
    startRecording(request: StartRecordingRequest): Promise<StartRecordingResponse>;
    stopRecording(request: StopRecordingRequest): Promise<StopRecordingResponse>;
    leaveRoom(request: LeaveRoomRequest): Promise<LeaveRoomResponse>;
    closeRouter(request: CloseRouterRequest): Promise<CloseRouterResponse>;
    mute(request: MuteRequest): Promise<MuteResponse>;
}
