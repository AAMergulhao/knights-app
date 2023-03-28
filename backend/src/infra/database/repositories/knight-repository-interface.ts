import { FormatedKnight, IKnight } from "../model/Knight";

//TODO ADD aditional methods
export interface IKnightRepository {
  create(knight: IKnight): Promise<IKnight>;
  findById(id: string): Promise<IKnight>;
  findByNickName(nickname: string): Promise<IKnight>;
  softDelete(id: string): Promise<void>;
  updateNickName(id: string, nickname: string): Promise<void>;
  findFormattedKnights(hero: boolean): Promise<FormatedKnight[]>
}