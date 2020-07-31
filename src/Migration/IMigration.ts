import {IAlgorithm} from '..';

export interface IMigration {
  rate: number;
  interval: number;

  init(): void;

  getCount(algorithm: IAlgorithm): number;

  getDestinations(algorithm: IAlgorithm): Array<number>;

  migrate(algorithm: IAlgorithm): void;
}
