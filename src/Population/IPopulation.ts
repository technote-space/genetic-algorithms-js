import {IChromosome} from '..';

export interface IPopulation {
  chromosomes: Array<IChromosome>;
  best: IChromosome;
  fitness: number;
  size: number;

  init(): void;

  update(chromosomes: Array<IChromosome>): Promise<void>;
}
