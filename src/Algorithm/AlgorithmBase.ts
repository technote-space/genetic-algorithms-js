import {IAlgorithm, IChromosome, IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion, ITermination} from '..';

export abstract class AlgorithmBase implements IAlgorithm {
  abstract get population(): IPopulation;

  abstract get fitness(): IFitness;

  abstract get selection(): ISelection;

  abstract get crossover(): ICrossover;

  abstract get crossoverProbability(): number;

  abstract get mutation(): IMutation;

  abstract get mutationProbability(): number;

  abstract get reinsertion(): IReinsertion;

  abstract get termination(): ITermination;

  get best(): IChromosome {
    return this.population.best;
  }

  get progress(): number {
    return this.termination.progress;
  }

  get hasReached(): boolean {
    return this.termination.hasReached(this);
  }

  public reset(): void {
    this.population.init();
    this.termination.init();
  }

  public step(): void {
    if (this.hasReached) {
      return;
    }

    const {parents, population} = this.selection.select(this.population.chromosomes);
    const offspring = this.crossover.cross(parents, this.crossoverProbability);
    offspring.forEach(chromosome => this.mutation.mutate(chromosome, this.mutationProbability));
    const newGeneration = this.reinsertion.select(population, offspring, parents);
    newGeneration.forEach(chromosome => chromosome.fitness = this.fitness.evaluate(chromosome));
    this.population.update(newGeneration);
  }
}