import { IKnight } from "@infra/database/model/Knight";

export const mockKnight: IKnight = {
  _id: '507f1f77bcf86cd799439011',
  name: "Mock",
  nickname: "mockKnight",
  birthday: "",
  weapons: [
    {
      name: "sword",
      mod: 3,
      attr: "strength",
      equipped: true
    }
  ],
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  keyAttribute: "strength"
} as IKnight;