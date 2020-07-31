import {IChromosome} from '..';

export interface IPopulation {
  chromosomes: Array<IChromosome>;
  size: number;

  init(): void;

  update(chromosomes: Array<IChromosome>): void;
}
