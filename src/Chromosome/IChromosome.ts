import {Gene} from '..';

export interface IChromosome {
  fitness: number;

  length: number;

  getGene(index: number): Gene;

  generateGene(index: number): Gene;

  createNew(): IChromosome;

  clone(): IChromosome;

  copyFrom(from: IChromosome): void;

  mutation(index: number): void;
}
