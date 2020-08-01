import {IChromosome, ICrossover} from '..';

export abstract class CrossoverBase implements ICrossover {
  protected constructor(protected readonly _parentsNumber: number, protected readonly _childrenNumber: number, protected readonly _probability: number) {
  }

  public get parentsNumber(): number {
    return this._parentsNumber;
  }

  public get childrenNumber(): number {
    return this._childrenNumber;
  }

  public cross(parents: Array<IChromosome>): Array<IChromosome> | never {
    if (parents.length !== this.parentsNumber) {
      throw new Error('Length is not same.');
    }

    const offspring = this.performCross(parents, this._probability);
    if (offspring.length !== this.childrenNumber) {
      throw new Error('Length is not same.');
    }

    return offspring;
  }

  protected abstract performCross(parents: Array<IChromosome>, probability: number): Array<IChromosome>;
}
