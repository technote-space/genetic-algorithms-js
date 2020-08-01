import {IChromosome, IMutation} from '..';

export abstract class MutationBase implements IMutation {
  // eslint-disable-next-line no-magic-numbers
  public mutate(chromosome: IChromosome, probability: number, deleteProbability = 0, insertProbability = 0): void {
    // eslint-disable-next-line no-magic-numbers
    if (deleteProbability > 0 && Math.random() < deleteProbability) {
      this.deleteAcid(chromosome);
    }

    // eslint-disable-next-line no-magic-numbers
    if (insertProbability > 0 && Math.random() < insertProbability) {
      this.insertAcid(chromosome);
    }

    [...Array(chromosome.length).keys()].forEach(index => {
      if (Math.random() < probability) {
        chromosome.mutation(index);
      }
    });
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
