import {IChromosome, ICrossover} from '..';

export abstract class CrossoverBase implements ICrossover {
  protected constructor(protected readonly _parentsNumber: number, protected readonly _childrenNumber: number) {
  }

  public get parentsNumber(): number {
    return this._parentsNumber;
  }

  public get childrenNumber(): number {
    return this._childrenNumber;
  }

  public async cross(parents: Array<IChromosome>, probability: number): Promise<Array<IChromosome>> | never {
    if (parents.length !== this.parentsNumber) {
      throw new Error('Length is not same.');
    }

    const offspring = await this.performCross(parents, probability);
    if (offspring.length !== this.childrenNumber) {
      throw new Error('Length is not same.');
    }

    return offspring;
  }

  protected abstract async performCross(parents: Array<IChromosome>, probability: number): Promise<Array<IChromosome>>;
}
