import Client from 'entities/Client';
import {LoadableContainer} from 'state/entities/LoadableContainer';

export interface ClientDetailsContainer {
  client: LoadableContainer<Client>;
}
