import {IChromosome, IMutation} from '..';

export abstract class MutationBase implements IMutation {
  public mutate(chromosome: IChromosome, probability: number): void {
    [...Array(chromosome.length).keys()].forEach(index => {
      if (Math.random() < probability) {
        chromosome.mutation(index);
      }
    });
  }
}
