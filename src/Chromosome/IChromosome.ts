import {Acid} from '..';

export interface IChromosome {
  fitness: number | undefined;

  length: number;

  getGene(index: number): Acid;

  setGene(index: number, gene: Acid): void;

  generateGene(index: number): Acid;

  generateGenes(): void;

  createNew(): IChromosome;

  clone(): IChromosome;

  copyFrom(from: IChromosome): void;

  mutation(index: number): void;
}
