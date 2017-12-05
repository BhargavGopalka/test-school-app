export class Report {
  public _id: string;
  private _attendanceDate: string;
  private _isEnable: boolean;
  private _studentData: Student[];
  private _teacher: Teacher;
  private _classData: Classdata;
  private _present: number;
  private _absent: number;

  get present(): number {
    return this._present;
  }

  set present(value: number) {
    this._present = value;
  }

  get absent(): number {
    return this._absent;
  }

  set absent(value: number) {
    this._absent = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get attendanceDate(): string {
    return this._attendanceDate;
  }

  set attendanceDate(value: string) {
    this._attendanceDate = value;
  }

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }

  get studentData(): Student[] {
    return this._studentData;
  }

  set studentData(value: Student[]) {
    this._studentData = value;
  }

  get teacher(): Teacher {
    return this._teacher;
  }

  set teacher(value: Teacher) {
    this._teacher = value;
  }

  get classData(): Classdata {
    return this._classData;
  }

  set classData(value: Classdata) {
    this._classData = value;
  }
}

export class Student {
  private _firstName: string;
  private _lastName: string;
  private _studentId: string;
  private _status: string;
  private _id: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get studentId(): string {
    return this._studentId;
  }

  set studentId(value: string) {
    this._studentId = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}

export class Teacher {
  private _firstName: string;
  private _lastName: string;
  private _teacherId: string;

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get teacherId(): string {
    return this._teacherId;
  }

  set teacherId(value: string) {
    this._teacherId = value;
  }
}

export class Classdata {
  private _name: string;
  private _classId: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get classId(): string {
    return this._classId;
  }

  set classId(value: string) {
    this._classId = value;
  }
}
