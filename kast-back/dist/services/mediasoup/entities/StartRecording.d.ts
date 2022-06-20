export declare type StartRecordingPattern = {
    area: 'recording';
    action: 'start';
};
export interface StartRecordingRequest {
    roomId: string;
    userId: string;
    recordId: string;
    producerId?: string;
    audioProducerId?: string;
}
export interface StartRecordingResponse {
    response: boolean;
}
