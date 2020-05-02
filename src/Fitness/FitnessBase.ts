import {IChromosome, IFitness} from '..';

export abstract class FitnessBase implements IFitness {
  public abstract async evaluate(chromosome: IChromosome): Promise<number>;
}
