import { FormatedKnight, IKnight } from "infra/database/model/Knight";

export interface IKnightService {
  create(knight: IKnight): Promise<IKnight>;
  findById(id: string): Promise<IKnight>;
  softDelete(id: string): Promise<void>;
  updateNickName(id: string, nickname: string): Promise<void>;
  findFormatedKnights(hero: boolean): Promise<FormatedKnight[]>;
}