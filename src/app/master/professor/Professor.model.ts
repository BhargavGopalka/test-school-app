import {Department} from '../department/department.model';
import {Classes} from '../classes/classes.model';

export class Professor {
  public _id: string;
  private _address: string;
  private _birthDate: string;
  private _experience: string;
  private _joinDate: string;
  private _specialization: string;
  private _company: string;
  private _professorId: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _mobileNumber: string;
  private _image: string;
  private _role: string;
  private _applicationId: string;
  private _isEnable: boolean;
  private _approveStatus: string;
  private _gender: string;
  private _allocatedClass: Classes[];
  private _department: Department[];

  get allocatedClass(): Classes[] {
    return this._allocatedClass;
  }

  set allocatedClass(value: Classes[]) {
    this._allocatedClass = value;
  }

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

  get experience(): string {
    return this._experience;
  }

  set experience(value: string) {
    this._experience = value;
  }

  get joinDate(): string {
    return this._joinDate;
  }

  set joinDate(value: string) {
    this._joinDate = value;
  }

  get specialization(): string {
    return this._specialization;
  }

  set specialization(value: string) {
    this._specialization = value;
  }

  get company(): string {
    return this._company;
  }

  set company(value: string) {
    this._company = value;
  }

  get professorId(): string {
    return this._professorId;
  }

  set professorId(value: string) {
    this._professorId = value;
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

  get gender(): string {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }



  get department(): Department[] {
    return this._department;
  }

  set department(value: Department[]) {
    this._department = value;
  }
}

export class AllocatedClasses {
  private _isEnable: boolean;
  private _className: string;
  private _classId: string;
  private _id: string;

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }

  get className(): string {
    return this._className;
  }

  set className(value: string) {
    this._className = value;
  }

  get classId(): string {
    return this._classId;
  }

  set classId(value: string) {
    this._classId = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
