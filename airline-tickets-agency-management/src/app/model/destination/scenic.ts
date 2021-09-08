import {Destiation} from './destiation';

export interface Scenic {
  scenicId?: number;
  scenicName?: string;
  scenicDescription?: string;
  scenicImage?: string;
  destination?: Destiation;
}
