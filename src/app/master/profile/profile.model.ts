import {Classes} from '../classes/classes.model';
import {Student} from '../student/student.model';
import {Department} from '../department/department.model';

export class Profile {
  public _id: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _countryCode: string;
  private _mobileNumber: string;
  private _department: Department;
  private _allocatedClass: Classes[];
  private _studentClass: Student;
  private _role: string;
  private _gender: string;
  private _image: string;
  private _approveStatus: string;
  private _isEnable: boolean;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
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

  get countryCode(): string {
    return this._countryCode;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }

  get mobileNumber(): string {
    return this._mobileNumber;
  }

  set mobileNumber(value: string) {
    this._mobileNumber = value;
  }

  get department(): Department {
    return this._department;
  }

  set department(value: Department) {
    this._department = value;
  }

  get allocatedClass(): Classes[] {
    return this._allocatedClass;
  }

  set allocatedClass(value: Classes[]) {
    this._allocatedClass = value;
  }

  get studentClass(): Student {
    return this._studentClass;
  }

  set studentClass(value: Student) {
    this._studentClass = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get approveStatus(): string {
    return this._approveStatus;
  }

  set approveStatus(value: string) {
    this._approveStatus = value;
  }

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }
}
