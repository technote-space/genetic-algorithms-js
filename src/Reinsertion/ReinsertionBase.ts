import {IChromosome, IReinsertion} from '..';

export abstract class ReinsertionBase implements IReinsertion {
  public abstract select(population: Array<IChromosome>, offspring: Array<IChromosome>, parents: Array<IChromosome>): Array<IChromosome>;
}
