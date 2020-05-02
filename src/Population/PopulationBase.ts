import {IChromosome, IPopulation} from '..';

export abstract class PopulationBase implements IPopulation {
  private _chromosomes: Array<IChromosome>;
  private _generation: number;
  private _fitness: number;

  protected constructor(private _size: number, private _adamChromosome: IChromosome, protected _bestChanged: undefined | (() => void) = undefined) {
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

  public async init(): Promise<void> {
    this._chromosomes = new Array<IChromosome>(this._size);
    this._generation = 0;
    await Promise.all([...Array(this._size)].map(() => this._chromosomes.push(this._adamChromosome.createNew())));
  }

  public update(chromosomes: Array<IChromosome>): void {
    this._chromosomes = Array.from(chromosomes).sort((chromosome1, chromosome2) => chromosome2.fitness - chromosome1.fitness);
    if (this.best.fitness !== this._fitness) {
      this._fitness = this.best.fitness;
      if (this._bestChanged) {
        this._bestChanged();
      }
    }
  }
}
