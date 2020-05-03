import {Gene} from '..';

export interface IChromosome {
  fitness: number | undefined;

  length: number;

  getGene(index: number): Gene;

  setGene(index: number, gene: Gene): void;

  generateGene(index: number): Gene;

  generateGenes(): void;

  createNew(): IChromosome;

  clone(): IChromosome;

  copyFrom(from: IChromosome): void;

  mutation(index: number): void;
}
