import {IChromosome} from '..';

export interface ICrossover {
  parentsNumber: number;
  childrenNumber: number;

  cross(parents: Array<IChromosome>): Array<IChromosome>;
}
