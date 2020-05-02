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

  public async reset(): Promise<void> {
    this.population.init();
    this.termination.init();
  }

  public async step(): Promise<void> {
    if (this.hasReached) {
      return;
    }

    const {parents, population} = await this.selection.select(this.population.chromosomes);
    const offspring = await this.crossover.cross(parents, this.crossoverProbability);
    await Promise.all(offspring.map(chromosome => async(): Promise<void> => {
      this.mutation.mutate(chromosome, this.mutationProbability);
      chromosome.fitness = await this.fitness.evaluate(chromosome);
    }));
    await Promise.all(parents.map(chromosome => async(): Promise<void> => {
      chromosome.fitness = chromosome.fitness ?? await this.fitness.evaluate(chromosome);
    }));
    const newGeneration = await this.reinsertion.select(population, offspring, parents);
    this.population.update(newGeneration);
  }
}
