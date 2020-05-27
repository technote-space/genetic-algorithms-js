import {IAlgorithm, IChromosome, IMigration} from '..';

export abstract class MigrationBase implements IMigration {
  // eslint-disable-next-line no-magic-numbers
  private prev = 0;

  // eslint-disable-next-line no-magic-numbers
  private time = 0;

  public get rate(): number {
    // eslint-disable-next-line no-magic-numbers
    return 0.1;
  }

  public get interval(): number {
    // eslint-disable-next-line no-magic-numbers
    return 10000;
  }

  public init(): void {
    this.prev = 0;
    this.time = 0;
  }

  public getCount(algorithm: IAlgorithm): number {
    return algorithm.offspringNumber;
  }

  public getDestinations(algorithm: IAlgorithm): Array<number> {
    const islandNumber = algorithm.islands.length;
    // eslint-disable-next-line no-magic-numbers
    const time = this.time % (islandNumber - 1);
    // eslint-disable-next-line no-magic-numbers
    return [...Array(islandNumber).keys()].map(num => (num + 1 + time) % islandNumber);
  }

  public async migrate(algorithm: IAlgorithm): Promise<void> {
    const count = this.getCount(algorithm);
    if (count >= this.prev + this.interval) {
      this.prev = count;
      await this.performMigrate(algorithm);
      this.time++;
    }
  }

  protected static takeRandomChromosomes(chromosomes: Array<IChromosome>, count: number): Array<IChromosome> {
    const results: Array<IChromosome> = [];
    // eslint-disable-next-line no-magic-numbers
    while (--count >= 0) {
      // eslint-disable-next-line no-magic-numbers
      results.push(...chromosomes.splice(Math.floor(Math.random() * chromosomes.length), 1));
    }

    return results;
  }

  protected getTakeCount(chromosomes: Array<IChromosome>): number {
    return Math.ceil(chromosomes.length * this.rate);
  }

  protected static splitChromosomes(chromosomes: Array<IChromosome>, count: number): { population: Array<IChromosome>, emigrants: Array<IChromosome> } {
    const population = [...chromosomes];
    const emigrants = MigrationBase.takeRandomChromosomes(population, count);
    return {population, emigrants};
  }

  protected async performMigrate(algorithm: IAlgorithm): Promise<void> {
    const destination = this.getDestinations(algorithm);
    const islands = algorithm.islands.map(island => MigrationBase.splitChromosomes(island.population.chromosomes, this.getTakeCount(island.population.chromosomes)));
    islands.forEach((island, index) => {
      islands[destination[index]].population.push(...island.emigrants);
    });

    await Promise.all(algorithm.islands.map((island, index) => island.population.update(islands[index].population)));
  }
}
