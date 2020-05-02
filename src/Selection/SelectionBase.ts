import {ISelection, IChromosome} from '..';

export abstract class SelectionBase implements ISelection {
  public abstract select(chromosomes: Array<IChromosome>): { parents: Array<IChromosome>; population: Array<IChromosome> };
}
