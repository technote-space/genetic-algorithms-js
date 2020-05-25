export class Acid {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _value: any) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get value(): any {
    return this._value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
  public mutation(value: any): void {
    this._value = value;
  }
}
