import {IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion} from '..';

export interface IIsland {
  generationNumber: number;
  offspringNumber: number;
  initialized: boolean;
  population: IPopulation;
  fitness: IFitness;
  selection: ISelection;
  crossover: ICrossover;
  crossoverProbability: number;
  mutation: IMutation;
  mutationProbability: number;
  reinsertion: IReinsertion;

  reset(): void;

  step(): void;
}
