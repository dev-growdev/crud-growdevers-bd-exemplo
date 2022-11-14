import { randomUUID } from "crypto";

export class Assessment {
  private _id: string;

  get id(): string {
    return this._id;
  }

  private _grade: number;
  get grade(): number {
    return this._grade;
  }

  private _subject: string;
  get subject(): string {
    return this._subject;
  }

  constructor(grade: number, subject: string) {
    this._id = randomUUID();
    this._grade = grade;
    this._subject = subject;
  }

  static create(id: string, grade: number, subject: string): Assessment {
    const model = new Assessment(grade, subject);
    model._id = id;
    return model;
  }

  toJson() {
    return {
      id: this._id,
      grade: this._grade,
      subject: this._subject,
    };
  }
}
