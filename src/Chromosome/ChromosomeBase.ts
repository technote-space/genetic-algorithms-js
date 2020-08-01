import {Acid, IChromosome} from '..';

export abstract class ChromosomeBase implements IChromosome {
  private acids: Array<Acid>;

  protected constructor(_length: number) {
    // eslint-disable-next-line no-magic-numbers
    if (_length < 1) {
      throw new Error('Too short.');
    }

    this.acids = new Array<Acid>(_length);
  }

  public createFromAcids(acids: Array<Acid>): void {
    this.acids = [...acids];
  }

  public abstract get fitness(): number;

  public get length(): number {
    return this.acids.length;
  }

  public getAcid(index: number): Acid {
    return this.acids[index];
  }

  public setAcid(index: number, acid: Acid): void {
    this.acids[index] = acid;
  }

  public deleteAcid(index: number): void {
    // eslint-disable-next-line no-magic-numbers
    this.acids.splice(index, 1);
  }

  public insertAcid(index: number, acid: Acid): void {
    // eslint-disable-next-line no-magic-numbers
    this.acids.splice(index, 0, acid);
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
      this.acids = new Array<Acid>(from.length);
    }

    // eslint-disable-next-line no-magic-numbers
    for (let index = from.length; --index >= 0;) {
      this.acids[index] = from.getAcid(index);
    }

    this.performCopyFrom(from);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected performCopyFrom(_from: IChromosome): void {
    // override if required
  }

  public mutation(index: number): void {
    this.acids[index] = this.generateAcid(index);
  }
}
