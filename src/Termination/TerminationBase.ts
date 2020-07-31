import {IAlgorithm, ITermination} from '..';

export abstract class TerminationBase implements ITermination {
  private _hasReached = false;
  // eslint-disable-next-line no-magic-numbers
  private _progress   = 0;

  public get progress(): number {
    return this._progress;
  }

  public init(): void {
    this._hasReached = false;
    this._progress   = 0;
    this.performInit();
  }

  protected performInit(): void {
    // override if required
  }

  public hasReached(algorithm: IAlgorithm): boolean {
    if (!this._hasReached) {
      this._hasReached = this.performHasReached(algorithm);
      if (this._hasReached) {
        this._progress = 1;
      } else {
        this._progress = this.performGetProgress(algorithm);
      }
    }

    return this._hasReached;
  }

  protected abstract performGetProgress(algorithm: IAlgorithm): number;

  protected abstract performHasReached(algorithm: IAlgorithm): boolean;
}
