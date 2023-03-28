import { Schema } from "mongoose";

export interface IWeapon {
  name: string;
  mod: number;
  attr: string; //TODO switch to ENUM
  equipped: boolean
}

export const WeaponSchema = new Schema({
  name: { type: String, required: [true, 'weapon.name cannot be null or empty'] },
  mod: { type: Number, required: [true, 'weapon.mod cannot be null or empty'] },
  attr: { type: String, required: [true, 'weapon.attr cannot be null or empty'] },
  equipped: { type: Boolean, required: [true, 'weapon.equipped cannot be null or empty'] }
}, { _id: false });