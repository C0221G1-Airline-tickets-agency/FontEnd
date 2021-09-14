import {Scenic} from './scenic';

export interface Destiation {
  destinationId?: number;
  destinationName?: string;
  destinationDescription?: string;
  destinationImage?: string;
  listScenic?: Scenic[];
}
