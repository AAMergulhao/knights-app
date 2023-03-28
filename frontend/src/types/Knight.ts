import { Attributes } from "./Attributes";
import { Weapon } from "./Weapon";

export interface RawKnight {
  _id?: string;
  name: string;
  nickname: string;
  birthday: string;
  weapons: Weapon[];
  attributes: Attributes;
  keyAttribute: string;
  hero?: boolean;
}

export type FormatedKnight = {
  _id: string;
  name: string;
  nickname: string;
  weapons: number;
  age: number;
  exp: number;
  attack: number;
}