export class Gene {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private _value: any) {
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get value(): any {
    return this._value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mutation(value: any): void {
    this._value = value;
  }
}
