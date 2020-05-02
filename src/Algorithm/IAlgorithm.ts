import {IChromosome, IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion, ITermination} from '..';

export interface IAlgorithm {
  population: IPopulation;
  fitness: IFitness;
  selection: ISelection;
  crossover: ICrossover;
  crossoverProbability: number;
  mutation: IMutation;
  mutationProbability: number;
  reinsertion: IReinsertion;
  termination: ITermination;

  best: IChromosome;
  progress: number;
  hasReached: boolean;

  reset(): void;

  step(): void;
}
