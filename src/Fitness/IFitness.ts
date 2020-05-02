import {IChromosome} from '..';

export interface IFitness {
  evaluate(chromosome: IChromosome): Promise<number>;
}
