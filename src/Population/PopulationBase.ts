import {IChromosome, IPopulation} from '..';

export abstract class PopulationBase implements IPopulation {
  private _chromosomes: Array<IChromosome>;
  private _generation: number;

  protected constructor(private readonly _size: number, private readonly _adamChromosome: IChromosome) {
    this._chromosomes = [];
    this._generation = 0;
  }

  get chromosomes(): Array<IChromosome> {
    return this._chromosomes;
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

    this._chromosomes = Array.from(chromosomes);
  }
}
