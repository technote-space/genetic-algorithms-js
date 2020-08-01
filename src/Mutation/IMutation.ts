import {IChromosome} from '..';

export interface IMutation {
  mutate(chromosome: IChromosome): void;
}
