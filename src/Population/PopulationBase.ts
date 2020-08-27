import {IChromosome, IPopulation} from '..';

export abstract class PopulationBase implements IPopulation {
  private _chromosomes: Array<IChromosome>;
  protected _pool: Array<IChromosome>;

  protected constructor(private readonly _size: number, private readonly _adamChromosome: IChromosome) {
    this._chromosomes = [];
    this._pool        = [];
    [...Array(_size)].forEach(() => {
      this._pool.push(_adamChromosome.clone());
    });
  }

  get chromosomes(): Array<IChromosome> {
    return this._chromosomes;
  }

  get size(): number {
    return this._size;
  }

  public init(): void {
    this._chromosomes = new Array<IChromosome>();
    [...Array(this.size)].forEach(() => this._chromosomes.push(this._adamChromosome.createNew()));
    this.performInit();
  }

  protected performInit(): void {
    // override if required
  }

  public update(chromosomes: Array<IChromosome>): void {
    if (this.size !== chromosomes.length) {
      throw new Error('Population size does not match the setting.');
    }

    // eslint-disable-next-line no-magic-numbers
    for (let index = chromosomes.length; --index >= 0;) {
      this._pool[index].copyFrom(chromosomes[index]);
    }

    // eslint-disable-next-line no-magic-numbers
    for (let index = this._pool.length; --index >= 0;) {
      this._chromosomes[index].copyFrom(this._pool[index]);
    }
  }
}
