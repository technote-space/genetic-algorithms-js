import {IChromosome, IMutation} from '..';

export abstract class MutationBase implements IMutation {
  public abstract mutate(chromosome: IChromosome, probability: number): void;
}
