import {IAlgorithm, IChromosome, ITermination, IIsland, IMigration} from '..';

export abstract class AlgorithmBase implements IAlgorithm {
  private _chromosomes: Array<IChromosome> = [];
  private _fitness: number;

  protected constructor(protected readonly _bestChanged: undefined | (() => void) = undefined) {
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

  private resetChromosomes(): void {
    this._chromosomes.length = 0;
    this.islands.forEach(island => {
      island.population.chromosomes.forEach(chromosome => {
        this._chromosomes.push(chromosome);
      });
    });
  }

  protected updateChromosomes(): void {
    this._chromosomes.sort((c1, c2) => c2.fitness - c1.fitness);
    if (this._chromosomes.length) {
      const bestFitness = this._chromosomes[0].fitness;
      // eslint-disable-next-line no-magic-numbers
      if (bestFitness >= 0 && bestFitness !== this._fitness) {
        this._fitness = bestFitness;
        if (this._bestChanged) {
          this._bestChanged();
        }
      }
    }
  }

  public reset(): void {
    this.islands.forEach(island => island.reset());
    this.resetChromosomes();
    this.migration?.init();
    this.termination.init();
    this.updateChromosomes();
    this.performReset();
  }

  protected performReset(): void {
    // override if required
  }

  public step(): void {
    if (this.hasReached) {
      return;
    }

    this.islands.forEach(island => island.step());
    this.migration?.migrate(this);
    this.updateChromosomes();

    this.performStep();
  }

  protected performStep(): void {
    // override if required
  }
}
