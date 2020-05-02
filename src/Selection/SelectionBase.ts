import {ISelection, IChromosome} from '..';

export abstract class SelectionBase implements ISelection {
  public abstract async select(chromosomes: Array<IChromosome>): Promise<{ parents: Array<IChromosome>; population: Array<IChromosome> }>;
}
