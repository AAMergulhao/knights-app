import { Schema } from "mongoose";

export interface IAttributes {
  strength: number
  dexterity: number
  constitution: number
  intelligence: number
  wisdom: number
  charisma: number
}

export const AttributesSchema = new Schema({
  strength: { type: Number, required: [true, 'attribute.strength cannot be null or empty'] },
  dexterity: { type: Number, required: [true, 'attribute.dexterity cannot be null or empty'] },
  constitution: { type: Number, required: [true, 'attribute.constitution cannot be null or empty'] },
  intelligence: { type: Number, required: [true, 'attribute.intelligence cannot be null or empty'] },
  wisdom: { type: Number, required: [true, 'attribute.wisdom cannot be null or empty'] },
  charisma: { type: Number, required: [true, 'attribute.charisma cannot be null or empty'] }
}, { _id: false });