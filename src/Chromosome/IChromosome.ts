import {Acid} from '..';

export interface IChromosome {
  fitness: number | undefined;

  length: number;

  createFromAcids(acids: Array<Acid>): void;

  getAcid(index: number): Acid;

  setAcid(index: number, acid: Acid): void;

  generateAcid(index: number): Acid;

  generateAcids(): void;

  createNew(): IChromosome;

  clone(): IChromosome;

  copyFrom(from: IChromosome): void;

  mutation(index: number): void;
}
