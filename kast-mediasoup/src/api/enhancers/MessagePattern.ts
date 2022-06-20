import {MessagePattern as NestMessagePattern} from '@nestjs/microservices';
import {Pattern} from 'api/entities';

export const MessagePattern = (pattern: Pattern) => NestMessagePattern(pattern);
