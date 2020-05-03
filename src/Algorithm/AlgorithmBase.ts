import {IAlgorithm, IChromosome, IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion, ITermination} from '..';

export abstract class AlgorithmBase implements IAlgorithm {
  // eslint-disable-next-line no-magic-numbers
  protected _generationNumber = 0;

  // eslint-disable-next-line no-magic-numbers
  protected _offspringNumber = 0;

  public get generationNumber(): number {
    return this._generationNumber;
  }

  public get offspringNumber(): number {
    return this._offspringNumber;
  }

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
    this._generationNumber = 0;
    this._offspringNumber = 0;
    this.performReset();
  }

  protected performReset(): void {
    // override if required
  }

  public async step(): Promise<void> {
    if (this.hasReached) {
      return;
    }

    const {parents, population} = await this.selection.select(this.population.chromosomes);
    const offspring = await this.crossover.cross(parents, this.crossoverProbability);
    await Promise.all(offspring.map(chromosome => async(): Promise<void> => {
      await this.mutation.mutate(chromosome, this.mutationProbability);
      chromosome.fitness = await this.fitness.evaluate(chromosome);
    }));
    await Promise.all(parents.map(chromosome => async(): Promise<void> => {
      chromosome.fitness = chromosome.fitness ?? await this.fitness.evaluate(chromosome);
    }));
    const newGeneration = await this.reinsertion.select(population, offspring, parents, this.population.size);
    await this.population.update(newGeneration);
    this._generationNumber++;
    this._offspringNumber += offspring.length;
    this.performStep();
  }

  protected performStep(): void {
    // override if required
  }
}
