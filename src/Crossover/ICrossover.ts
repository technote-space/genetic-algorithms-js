import {IChromosome} from '..';

export interface ICrossover {
  parentsNumber: number;
  childrenNumber: number;

  cross(parents: Array<IChromosome>, probability: number): Array<IChromosome>;
}
