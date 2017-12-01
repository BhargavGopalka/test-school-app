export class Department {
  public _id: string;
  private _name: string;
  private _isEnable: boolean;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }
}
