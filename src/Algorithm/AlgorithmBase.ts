import {IAlgorithm, IChromosome, ITermination, IIsland, IMigration} from '..';

export abstract class AlgorithmBase implements IAlgorithm {
  private _chromosomes: Array<IChromosome> = [];
  private _fitness: number;

  protected constructor(protected readonly _bestChanged: undefined | (() => Promise<void>) = undefined) {
    this._fitness = 0;
  }

  public get generationNumber(): number {
    // eslint-disable-next-line no-magic-numbers
    return this.islands.reduce((acc, island) => acc + island.generationNumber, 0);
  }

  public get offspringNumber(): number {
    // eslint-disable-next-line no-magic-numbers
    return this.islands.reduce((acc, island) => acc + island.offspringNumber, 0);
  }

  public get initialized(): boolean {
    return this.islands.every(island => island.initialized);
  }

  public get chromosomes(): Array<IChromosome> {
    return this._chromosomes;
  }

  abstract get islands(): Array<IIsland>;

  public get migration(): IMigration | undefined {
    return undefined;
  }

  abstract get termination(): ITermination;

  get best(): IChromosome {
    return this._chromosomes[0];
  }

  get progress(): number {
    return this.termination.progress;
  }

  get hasReached(): boolean {
    return this.termination.hasReached(this);
  }

  protected async updateChromosomes(): Promise<void> {
    // eslint-disable-next-line no-magic-numbers
    this._chromosomes = this.islands.flatMap(island => island.population.chromosomes).sort((c1, c2) => c2.fitness - c1.fitness);
    // eslint-disable-next-line no-magic-numbers
    const bestFitness = this.best?.fitness;
    // eslint-disable-next-line no-magic-numbers
    if (bestFitness >= 0 && bestFitness !== this._fitness) {
      this._fitness = bestFitness;
      if (this._bestChanged) {
        await this._bestChanged();
      }
    }
  }

  public async reset(): Promise<void> {
    await Promise.all(this.islands.map(island => island.reset()));
    this.migration?.init();
    this.termination.init();
    await this.updateChromosomes();
    this.performReset();
  }

  protected performReset(): void {
    // override if required
  }

  public async step(): Promise<void> {
    if (this.hasReached) {
      return;
    }

    await Promise.all(this.islands.map(island => island.step()));
    await this.migration?.migrate(this);
    await this.updateChromosomes();

    this.performStep();
  }

  protected performStep(): void {
    // override if required
  }
}
