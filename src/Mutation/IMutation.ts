import {IChromosome} from '..';

export interface IMutation {
  mutate(chromosome: IChromosome, probability: number): void;
}
