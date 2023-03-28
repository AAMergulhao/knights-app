import { Document, model, Schema } from "mongoose";
import { AttributesSchema, IAttributes } from "./Attributes";
import { IWeapon, WeaponSchema } from "./Weapon";

export interface IKnight extends Document {
  name: string;
  nickname: string;
  birthday: string;
  weapons: IWeapon[];
  attributes: IAttributes;
  keyAttribute: string;
  keyAttributeMod: number;
  hero: boolean;
}

export interface FormatedKnight {
  _id: string;
  name: string;
  nickname: string;
  weapons: number;
  age: number;
  exp: number;
  attack: number;
}

const KnightSchema = new Schema({
  name: { type: String, required: [true, 'Name cannot be null or empty'] },
  nickname: { type: String, required: [true, 'nickname cannot be null or empty'], unique: true },
  birthday: { type: Date, required: [true, 'birthday cannot be null or empty'] },
  weapons: [WeaponSchema],
  attributes: AttributesSchema,
  keyAttribute: { type: String, required: [true, 'keyAttribute cannot be null or empty'] },
  keyAttributeMod: { type: Number, require: true },
  hero: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default model<IKnight>('Knight', KnightSchema);