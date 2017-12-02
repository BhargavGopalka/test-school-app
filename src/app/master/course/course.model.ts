export class Course {
  private _id: string;
  private _departmentId: string;
  private _departmentName: string;
  private _name: string;
  private _isEnable: boolean;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get departmentId(): string {
    return this._departmentId;
  }

  set departmentId(value: string) {
    this._departmentId = value;
  }

  get departmentName(): string {
    return this._departmentName;
  }

  set departmentName(value: string) {
    this._departmentName = value;
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
