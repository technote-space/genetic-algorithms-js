import {IChromosome, ITermination, IIsland, IMigration} from '..';

export interface IAlgorithm {
  generationNumber: number;
  offspringNumber: number;
  initialized: boolean;
  islands: Array<IIsland>;

  chromosomes: Array<IChromosome>;
  migration?: IMigration;
  termination: ITermination;

  best: IChromosome;
  progress: number;
  hasReached: boolean;

  reset(): void;

  step(): void;
}
