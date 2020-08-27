import {IChromosome} from '..';

export interface IReinsertion {
  select(population: Array<IChromosome>, offspring: Array<IChromosome>, parents: Array<IChromosome>): Array<IChromosome>;
}
