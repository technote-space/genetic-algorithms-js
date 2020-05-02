import {IChromosome, IMutation} from '..';

export abstract class MutationBase implements IMutation {
  public abstract async mutate(chromosome: IChromosome, probability: number): Promise<void>;
}
