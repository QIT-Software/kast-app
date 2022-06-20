import {Field, ObjectType, registerEnumType} from '@nestjs/graphql';
import {MediaKind, MediaType, ProducerOptions} from 'entities/Mediasoup';
import graphqlTypeJson from 'graphql-type-json';

registerEnumType(MediaKind, {name: 'MediaKind'});
registerEnumType(MediaType, {name: 'MediaType'});

@ObjectType()
export default class ParticipantTrackOptions {
  constructor(
    enabled: boolean,
    muted: boolean,
    clientId: string | undefined,
    userId: string | undefined,
    producerOptions: ProducerOptions | undefined,
    mediaKind: MediaKind | undefined,
    mediaType: MediaType | undefined,
  ) {
    this.enabled = enabled;
    this.muted = muted;
    this.clientId = clientId;
    this.userId = userId;
    this.producerOptions = producerOptions;
    this.mediaKind = mediaKind;
    this.mediaType = mediaType;
  }

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Boolean)
  muted: boolean;

  @Field(() => String, {nullable: true})
  clientId: string | undefined;

  @Field(() => String, {nullable: true})
  userId: string | undefined;

  @Field(() => graphqlTypeJson, {nullable: true})
  producerOptions: ProducerOptions | undefined;

  @Field(() => String, {nullable: true})
  mediaKind: MediaKind | undefined;

  @Field(() => String, {nullable: true})
  mediaType: MediaType | undefined;
}
