import {IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion, IIsland, IChromosome} from '..';

export abstract class IslandBase implements IIsland {
  // eslint-disable-next-line no-magic-numbers
  protected _generationNumber = 0;

  // eslint-disable-next-line no-magic-numbers
  protected _offspringNumber = 0;

  private _initialized = false;

  public get generationNumber(): number {
    return this._generationNumber;
  }

  public get offspringNumber(): number {
    return this._offspringNumber;
  }

  public get initialized(): boolean {
    return this._initialized;
  }

  abstract get population(): IPopulation;

  abstract get fitness(): IFitness;

  abstract get selection(): ISelection;

  abstract get crossover(): ICrossover;

  abstract get mutation(): IMutation;

  abstract get reinsertion(): IReinsertion;

  public reset(): void {
    this._initialized = false;
    this.population.init();
    this.population.chromosomes.forEach((chromosome): void => {
      this.fitness.evaluate(chromosome);
    });
    this._generationNumber = 0;
    this._offspringNumber  = 0;
    this.performReset();
    this._initialized = true;
  }

  protected performReset(): void {
    // override if required
  }

  protected performMutate(chromosomes: Array<IChromosome>): void {
    chromosomes.forEach((chromosome): void => {
      this.mutation.mutate(chromosome);
    });
  }

  protected performEvaluate(chromosomes: Array<IChromosome>): void {
    chromosomes.forEach((chromosome): void => {
      this.fitness.evaluate(chromosome);
    });
  }

  public step(): void {
    if (!this._initialized) {
      this.reset();
    }

    const {parents, population} = this.selection.select(this.population.chromosomes);
    const offspring             = this.crossover.cross(parents);
    const offspringCount        = offspring.length;

    this.performMutate(offspring);

    const evaluateTargets: Array<IChromosome> = [...offspring];
    parents.forEach(parent => {
      evaluateTargets.push(parent);
    });
    this.performEvaluate(evaluateTargets);

    const newGeneration = this.reinsertion.select(population, offspring, parents);
    this.population.update(newGeneration);

    this._generationNumber++;
    this._offspringNumber += offspringCount;
    this.performStep();
  }

  protected performStep(): void {
    // override if required
  }
}
