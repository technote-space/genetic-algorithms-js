import {IChromosome, IMutation} from '..';

export abstract class MutationBase implements IMutation {
  // eslint-disable-next-line no-magic-numbers
  protected constructor(protected readonly _probability: number, protected readonly _deleteProbability = 0, protected readonly _insertProbability = 0) {
  }

  public mutate(chromosome: IChromosome): void {
    // eslint-disable-next-line no-magic-numbers
    if (this._deleteProbability > 0 && Math.random() < this._deleteProbability) {
      this.deleteAcid(chromosome);
    }

    [...Array(chromosome.length).keys()].forEach(index => {
      if (Math.random() < this._probability) {
        chromosome.mutation(index);
      }
    });

    // eslint-disable-next-line no-magic-numbers
    if (this._insertProbability > 0 && Math.random() < this._insertProbability) {
      this.insertAcid(chromosome);
    }
  }

  protected deleteAcid(chromosome: IChromosome): void {
    // eslint-disable-next-line no-magic-numbers
    if (chromosome.length <= 1) {
      return;
    }

    chromosome.deleteAcid(Math.floor(Math.random() * chromosome.length));
  }

  protected insertAcid(chromosome: IChromosome): void {
    // eslint-disable-next-line no-magic-numbers
    const index = Math.floor(Math.random() * (chromosome.length + 1));
    chromosome.insertAcid(index, chromosome.generateAcid(index));
  }
}
