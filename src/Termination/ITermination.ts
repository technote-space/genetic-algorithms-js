import {IAlgorithm} from '..';

export interface ITermination {
  progress: number;

  init(): void;

  hasReached(algorithm: IAlgorithm): boolean;
}
