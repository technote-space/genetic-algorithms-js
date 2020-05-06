import {Acid} from '..';

export interface IChromosome {
  fitness: number | undefined;

  length: number;

  getAcid(index: number): Acid;

  setAcid(index: number, acid: Acid): void;

  generateAcid(index: number): Acid;

  generateAcids(): void;

  createNew(): IChromosome;

  clone(): IChromosome;

  copyFrom(from: IChromosome): void;

  mutation(index: number): void;
}
