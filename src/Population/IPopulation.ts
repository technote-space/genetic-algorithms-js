import {IChromosome} from '..';

export interface IPopulation {
  chromosomes: Array<IChromosome>;
  best: IChromosome;
  fitness: number;

  init(): void;

  update(chromosomes: Array<IChromosome>): Promise<void>;
}
