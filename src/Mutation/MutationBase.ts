import {IChromosome, IMutation} from '..';

export abstract class MutationBase implements IMutation {
  public async mutate(chromosome: IChromosome, probability: number): Promise<void> {
    [...Array(chromosome.length).keys()].forEach(index => {
      if (Math.random() < probability) {
        chromosome.mutation(index);
      }
    });
  }
}
