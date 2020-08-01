import {IChromosome} from '..';

export interface IMutation {
  mutate(chromosome: IChromosome, probability: number, deleteProbability: number, insertProbability: number): void;
}
