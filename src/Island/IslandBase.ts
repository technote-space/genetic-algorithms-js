import {IPopulation, IFitness, ISelection, ICrossover, IMutation, IReinsertion, IIsland} from '..';

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

  abstract get crossoverProbability(): number;

  abstract get mutation(): IMutation;

  abstract get mutationProbability(): number;

  abstract get reinsertion(): IReinsertion;

  public async reset(): Promise<void> {
    this.population.init();
    await Promise.all(this.population.chromosomes.map(async(chromosome): Promise<void> => {
      await this.fitness.evaluate(chromosome);
    }));
    this._generationNumber = 0;
    this._offspringNumber = 0;
    this.performReset();
    this._initialized = true;
  }

  protected performReset(): void {
    // override if required
  }

  public async step(): Promise<void> {
    if (!this._initialized) {
      this.reset();
    }

    const {parents, population} = await this.selection.select(this.population.chromosomes);
    const offspring = await this.crossover.cross(parents, this.crossoverProbability);
    await Promise.all(offspring.map(async(chromosome): Promise<void> => {
      await this.mutation.mutate(chromosome, this.mutationProbability);
      await this.fitness.evaluate(chromosome);
    }));
    await Promise.all(parents.map(async(chromosome): Promise<void> => {
      if (chromosome.fitness === undefined) {
        await this.fitness.evaluate(chromosome);
      }
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
