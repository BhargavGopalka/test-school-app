import {Classes} from '../classes/classes.model';

export class Feedback {
  private _id: string;
  private _createdAt: string;
  private _otherRemarks: string;
  private _sessionStartTime: string;
  private _sessionEndTime: string;
  private _topic: string;
  private _communicationClarity: number;
  private _topicCoverage: number;
  private _explainAbility: number;
  private _exampleUse: number;
  private _isEnable: boolean;
  private _teacher: Teacher;
  private _student: Student;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  get otherRemarks(): string {
    return this._otherRemarks;
  }

  set otherRemarks(value: string) {
    this._otherRemarks = value;
  }

  get sessionStartTime(): string {
    return this._sessionStartTime;
  }

  set sessionStartTime(value: string) {
    this._sessionStartTime = value;
  }

  get sessionEndTime(): string {
    return this._sessionEndTime;
  }

  set sessionEndTime(value: string) {
    this._sessionEndTime = value;
  }

  get topic(): string {
    return this._topic;
  }

  set topic(value: string) {
    this._topic = value;
  }

  get communicationClarity(): number {
    return this._communicationClarity;
  }

  set communicationClarity(value: number) {
    this._communicationClarity = value;
  }

  get topicCoverage(): number {
    return this._topicCoverage;
  }

  set topicCoverage(value: number) {
    this._topicCoverage = value;
  }

  get explainAbility(): number {
    return this._explainAbility;
  }

  set explainAbility(value: number) {
    this._explainAbility = value;
  }

  get exampleUse(): number {
    return this._exampleUse;
  }

  set exampleUse(value: number) {
    this._exampleUse = value;
  }

  get isEnable(): boolean {
    return this._isEnable;
  }

  set isEnable(value: boolean) {
    this._isEnable = value;
  }

  get teacher(): Teacher {
    return this._teacher;
  }

  set teacher(value: Teacher) {
    this._teacher = value;
  }

  get student(): Student {
    return this._student;
  }

  set student(value: Student) {
    this._student = value;
  }
}

export class Teacher {
  private _firstName: string;
  private _lastName: string;
  private _teacherId: TeacherID;

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

  get teacherId(): TeacherID {
    return this._teacherId;
  }

  set teacherId(value: TeacherID) {
    this._teacherId = value;
  }
}

export class TeacherID {
  private _id: string;
  private _firstName: string;
  private _lastName: string;
  private _image: string;

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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }
}

export class Student {
  private _firstName: string;
  private _lastName: string;
  private _studentId: string;
  private _class: Classes;

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

  get class(): Classes {
    return this._class;
  }

  set class(value: Classes) {
    this._class = value;
  }
}
