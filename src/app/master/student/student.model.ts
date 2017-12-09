import {Classes} from '../classes/classes.model';

export class Student {
  public _id: string;
  private _address: string;
  private _birthDate: string;
  private _studentId: string;
  private _finalGrade: number;
  private _yearOfFirstJob: string;
  private _offerAcceptanceDate: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _mobileNumber: string;
  private _image: string;
  private _role: string;
  private _applicationId: string;
  private _isEnable: boolean;
  private _approveStatus: string;
  private _studentClass: AllocateClass;
  private _gender: string;
  private _allocatedClass: Classes[];

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }

  get birthDate(): string {
    return this._birthDate;
  }

  set birthDate(value: string) {
    this._birthDate = value;
  }

  get studentId(): string {
    return this._studentId;
  }

  set studentId(value: string) {
    this._studentId = value;
  }

  get finalGrade(): number {
    return this._finalGrade;
  }

  set finalGrade(value: number) {
    this._finalGrade = value;
  }

  get yearOfFirstJob(): string {
    return this._yearOfFirstJob;
  }

  set yearOfFirstJob(value: string) {
    this._yearOfFirstJob = value;
  }

  get offerAcceptanceDate(): string {
    return this._offerAcceptanceDate;
  }

  set offerAcceptanceDate(value: string) {
    this._offerAcceptanceDate = value;
  }

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

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get mobileNumber(): string {
    return this._mobileNumber;
  }

  set mobileNumber(value: string) {
    this._mobileNumber = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get applicationId(): string {
    return this._applicationId;
  }

  set applicationId(value: string) {
    this._applicationId = value;
  }

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }

  get approveStatus(): string {
    return this._approveStatus;
  }

  set approveStatus(value: string) {
    this._approveStatus = value;
  }

  get studentClass(): AllocateClass {
    return this._studentClass;
  }

  set studentClass(value: AllocateClass) {
    this._studentClass = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get allocatedClass(): Classes[] {
    return this._allocatedClass;
  }

  set allocatedClass(value: Classes[]) {
    this._allocatedClass = value;
  }
}

export class AllocateClass {
  private _classId: string;
  private _className: string;

  get classId(): string {
    return this._classId;
  }

  set classId(value: string) {
    this._classId = value;
  }

  get className(): string {
    return this._className;
  }

  set className(value: string) {
    this._className = value;
  }


}
