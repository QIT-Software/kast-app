"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaCodecs = void 0;
exports.mediaCodecs = [
    {
        kind: 'audio',
        mimeType: 'audio/opus',
        preferredPayloadType: 111,
        clockRate: 48000,
        channels: 2,
        parameters: {
            minptime: 10,
            useinbandfec: 1,
        },
    },
    {
        kind: 'video',
        mimeType: 'video/H264',
        preferredPayloadType: 125,
        clockRate: 90000,
        parameters: {
            'packetization-mode': 1,
            'profile-level-id': '42e01f',
            'level-asymmetry-allowed': 1,
        },
    },
];
//# sourceMappingURL=MediaCodecs.js.map