import {IChromosome} from '..';

export interface ISelection {
  select(chromosomes: Array<IChromosome>): Promise<{ parents: Array<IChromosome>; population: Array<IChromosome> }>;
}
