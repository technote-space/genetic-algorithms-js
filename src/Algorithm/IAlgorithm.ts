import {IChromosome, IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion, ITermination} from '..';

export interface IAlgorithm {
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
  termination: ITermination;

  best: IChromosome;
  progress: number;
  hasReached: boolean;

  reset(): Promise<void>;

  step(): Promise<void>;
}
