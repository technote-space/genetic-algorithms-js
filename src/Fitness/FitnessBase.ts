import {IChromosome, IFitness} from '..';

export abstract class FitnessBase implements IFitness {
  public abstract evaluate(chromosome: IChromosome): void;
}
