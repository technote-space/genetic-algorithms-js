import {IChromosome} from '..';

export interface ISelection {
  select(chromosomes: Array<IChromosome>): { parents: Array<IChromosome>; population: Array<IChromosome> };
}
