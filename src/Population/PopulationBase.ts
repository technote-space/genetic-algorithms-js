import {IChromosome, IPopulation} from '..';

export abstract class PopulationBase implements IPopulation {
  private _chromosomes: Array<IChromosome>;
  private _generation: number;
  private _fitness: number;

  protected constructor(private readonly _size: number, private readonly _adamChromosome: IChromosome, protected readonly _bestChanged: undefined | (() => Promise<void>) = undefined) {
    this._chromosomes = [];
    this._generation = 0;
    this._fitness = 0;
  }

  get chromosomes(): Array<IChromosome> {
    return this._chromosomes;
  }

  get best(): IChromosome {
    return this._chromosomes[0];
  }

  get fitness(): number {
    return this._fitness;
  }

  get size(): number {
    return this._size;
  }

  public init(): void {
    this._chromosomes = new Array<IChromosome>();
    this._generation = 0;
    [...Array(this.size)].forEach(() => this._chromosomes.push(this._adamChromosome.createNew()));
    this.performInit();
  }

  protected performInit(): void {
    // override if required
  }

  public async update(chromosomes: Array<IChromosome>): Promise<void> {
    if (this.size !== chromosomes.length) {
      throw new Error('Population size does not match the setting.');
    }

    // eslint-disable-next-line no-magic-numbers
    this._chromosomes = Array.from(chromosomes).sort((chromosome1, chromosome2) => (chromosome2.fitness ?? -1.0) - (chromosome1.fitness ?? -1.0));
    if (this.best.fitness !== undefined && this.best.fitness !== this._fitness) {
      this._fitness = this.best.fitness;
      if (this._bestChanged) {
        await this._bestChanged();
      }
    }
  }
}
