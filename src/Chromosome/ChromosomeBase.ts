import {Acid, IChromosome} from '..';

export abstract class ChromosomeBase implements IChromosome {
  private readonly genes: Array<Acid>;
  public fitness: number | undefined = undefined;

  protected constructor(private readonly _length: number) {
    // eslint-disable-next-line no-magic-numbers
    if (_length < 2) {
      throw new Error('Too short.');
    }

    this.acids = new Array<Acid>(_length);
  }

  public get length(): number {
    return this._length;
  }

  public getAcid(index: number): Acid {
    return this.acids[index];
  }

  public setAcid(index: number, acid: Acid): void {
    this.acids[index] = acid;
  }

  public abstract generateAcid(index: number): Acid;

  public generateAcids(): void {
    [...Array(this.length).keys()].forEach(index => this.setAcid(index, this.generateAcid(index)));
  }

  public abstract createNew(): ChromosomeBase;

  public clone(): ChromosomeBase {
    const clone = this.createNew();
    clone.copyFrom(this);
    return clone;
  }

  public copyFrom(from: ChromosomeBase): void {
    if (from.length !== this.length) {
      throw new Error('Length is not same.');
    }

    // eslint-disable-next-line no-magic-numbers
    for (let index = this.length; --index >= 0;) {
      this.acids[index] = from.getAcid(index);
    }

    this.fitness = from.fitness;

    this.performCopyFrom(from);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected performCopyFrom(from: IChromosome): void {
    // override if required
  }

  public mutation(index: number): void {
    this.acids[index] = this.generateAcid(index);
  }
}
