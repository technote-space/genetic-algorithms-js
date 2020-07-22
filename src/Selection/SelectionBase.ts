import {ISelection, IChromosome} from '..';

export abstract class SelectionBase implements ISelection {
  public abstract async select(chromosomes: Array<IChromosome>): Promise<{ parents: Array<IChromosome>; population: Array<IChromosome> }>;

  protected takeRandom(chromosomes: Array<IChromosome>): IChromosome {
    // eslint-disable-next-line no-magic-numbers
    return chromosomes.splice(Math.floor(Math.random() * chromosomes.length), 1)[0];
  }

  protected takeByFitness(chromosomes: Array<IChromosome>): IChromosome | never {
    // eslint-disable-next-line no-magic-numbers
    const sum = chromosomes.reduce((acc, chromosome) => acc + (chromosome.fitness ?? 0), 0);
    let cumulative = 0.0;
    const rand = Math.random() * sum;
    for (let index = 0; index < chromosomes.length; index++) {
      const chromosome = chromosomes[index];
      // eslint-disable-next-line no-magic-numbers
      cumulative += chromosome.fitness ?? 0;
      if (cumulative >= rand) {
        // eslint-disable-next-line no-magic-numbers
        chromosomes.splice(index, 1);
        return chromosome;
      }
    }

    console.log(chromosomes);
    console.log(sum);
    console.log(rand);
    console.log(cumulative);
    throw new Error('Unexpected error');
  }

  protected takeByOrder(chromosomes: Array<IChromosome>): IChromosome | never {
    // eslint-disable-next-line no-magic-numbers
    const sum = chromosomes.length * (chromosomes.length + 1) / 2;
    let cumulative = 0.0;
    const rand = Math.random() * sum;
    for (let index = 0; index < chromosomes.length; index++) {
      cumulative += chromosomes.length - index;
      if (cumulative >= rand) {
        const chromosome = chromosomes[index];
        // eslint-disable-next-line no-magic-numbers
        chromosomes.splice(index, 1);
        return chromosome;
      }
    }

    console.log(chromosomes);
    console.log(sum);
    console.log(rand);
    console.log(cumulative);
    throw new Error('Unexpected error');
  }
}
