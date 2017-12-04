export class Classes {
  public _id: string;
  private _courseId: string;
  private _courseName: string;
  private _name: string;
  private _isEnable: string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get courseId(): string {
    return this._courseId;
  }

  set courseId(value: string) {
    this._courseId = value;
  }

  get courseName(): string {
    return this._courseName;
  }

  set courseName(value: string) {
    this._courseName = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get isEnable(): string {
    return this._isEnable;
  }

  set isEnable(value: string) {
    this._isEnable = value;
  }
}
