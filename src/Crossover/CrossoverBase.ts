import {IChromosome, ICrossover} from '..';

export abstract class CrossoverBase implements ICrossover {
  protected constructor(protected _parentsNumber: number, protected _childrenNumber: number) {
  }

  get parentsNumber(): number {
    return this._parentsNumber;
  }

  get childrenNumber(): number {
    return this._childrenNumber;
  }

  public cross(parents: Array<IChromosome>, probability: number): Array<IChromosome> {
    if (parents.length !== this.parentsNumber) {
      throw new Error('Length is not same.');
    }

    return this.performCross(parents, probability);
  }

  protected abstract performCross(parents: Array<IChromosome>, probability: number): Array<IChromosome>;
}
