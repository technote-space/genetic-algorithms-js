import {IChromosome, IReinsertion} from '..';

export abstract class ReinsertionBase implements IReinsertion {
  public abstract async select(population: Array<IChromosome>, offspring: Array<IChromosome>, parents: Array<IChromosome>): Promise<Array<IChromosome>>;
}
