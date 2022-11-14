import crypto from "crypto";
import "../utils/extension-methods";
import { Address } from "./address";
import { Assessment } from "./assessment";

interface AddressDTO {
  street: string;
  city: string;
  uf: string;
}

export class Growdever {
  // caracteristicas (atributos)
  private _id: string;

  get id(): string {
    return this._id;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  private _birth: Date;

  get birth(): Date {
    return this._birth;
  }

  private _cpf: string;

  get cpf(): string {
    return this._cpf;
  }

  // 'STUDYING', 'GRADUATED', 'CANCELED'
  private _status: string;

  get status(): string {
    return this._status;
  }

  private _skills: string[];

  get skills(): string[] {
    return [...this._skills];
  }

  private _address?: Address;

  get address(): Address | undefined {
    return this._address;
  }

  _assessments: Assessment[];

  get assessments(): Assessment[] {
    return this._assessments;
  }

  constructor(name: string, birth: Date, cpf: string, skills?: string[]) {
    this._id = crypto.randomUUID();
    this._name = name;
    this._birth = birth;
    this._cpf = cpf.clearSpecialCharacteres();
    this._status = "STUDYING";
    this._skills = skills ?? [];
    this._assessments = [];

    // this._skills = skills !== undefined ? skills : [];
    // this._skills = skills ? skills : [];

    // if(skills){
    // if (skills !== undefined) {
    //   this._skills = skills;
    // } else {
    //   this._skills = [];
    // }
  }

  // static nomeMentor: string = "Edson vindo do static";

  static create(
    id: string,
    name: string,
    cpf: string,
    birth: Date,
    status: string,
    skills: string[],
    assessments?: Assessment[],
    address?: Address
  ): Growdever {
    const model = new Growdever(name, birth, cpf, skills);
    model._id = id;
    model._status = status;

    if (assessments) {
      model._assessments = assessments;
    }

    if (address) {
      model._address = address;
    }

    return model;
  }

  // comportamentos (métodos)

  addAddress({ street, city, uf }: AddressDTO) {
    if (!street || !city || !uf) {
      throw new Error("Endereco inválido");
    }

    this._address = new Address(street, city, uf);
  }

  updateInformation(
    name: string,
    birth: Date,
    status: string,
    address: AddressDTO
  ) {
    if (!name) throw new Error("Nome inválido");

    if (!birth || isNaN(birth.getDate())) {
      throw new Error("Data de nascimento inválido");
    }

    if (!["STUDYING", "GRADUATED", "CANCELED"].some((s) => s === status)) {
      throw new Error(
        "Status inválido. Valores permitidos: STUDYING, GRADUATED ou CANCELED"
      );
    }

    this._name = name;
    this._birth = birth;
    this._status = status;

    if (!this._address && address) {
      this.addAddress(address);
    }

    if (this._address && !address) this._address = undefined;

    if (this.address && address) {
      this._address?.update(address.street, address.city, address.uf);
    }
  }

  updateSkills(newSkills: string[]) {
    if (!newSkills || newSkills.length === 0) {
      throw new Error("Não é possivel adicionar uma lista vazia.");
    }

    this._skills.push(...newSkills);
  }

  toJson() {
    return {
      id: this._id,
      name: this._name,
      birth: this._birth,
      cpf: this._cpf,
      status: this._status,
      skills: this._skills,
      address: this._address ? this._address.toJson() : undefined,
      assessments: this._assessments.map((a) => a.toJson()),
    };
  }

  deleteSkill(skill: string) {
    // "" -> false
    // undefined -> false
    // null -> false
    if (!skill) {
      throw new Error("Skill informada está inválida");
    }

    const indexSkill = this._skills.findIndex(
      (s) => s.toLowerCase() === skill.toLowerCase()
    );

    if (indexSkill < 0) {
      throw new Error("Skill não encontrada");
    }

    this._skills.splice(indexSkill, 1);
  }
}
