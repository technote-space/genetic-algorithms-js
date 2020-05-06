import {Acid, IChromosome} from '..';

export abstract class ChromosomeBase implements IChromosome {
  private readonly genes: Array<Acid>;
  public fitness: number | undefined = undefined;

  protected constructor(private readonly _length: number) {
    // eslint-disable-next-line no-magic-numbers
    if (_length < 2) {
      throw new Error('Too short.');
    }

    this.genes = new Array<Acid>(_length);
  }

  public get length(): number {
    return this._length;
  }

  public getGene(index: number): Acid {
    return this.genes[index];
  }

  public setGene(index: number, gene: Acid): void {
    this.genes[index] = gene;
  }

  public abstract generateGene(index: number): Acid;

  public generateGenes(): void {
    [...Array(this.length).keys()].forEach(index => this.setGene(index, this.generateGene(index)));
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
      this.genes[index] = from.getGene(index);
    }

    this.fitness = from.fitness;
  }

  public mutation(index: number): void {
    this.genes[index] = this.generateGene(index);
  }
}
