import { FormatedKnight, IKnight } from "@infra/database/model/Knight";
import KnightRepository from "@infra/database/repositories/knight-repository";
import { injectable } from "inversify";
import { Conflict, NotFound } from "@lib/errors";
import { IKnightService } from "./knight-service-interface";

@injectable()
class KnightService implements IKnightService {
  constructor(private knightRepository: KnightRepository) {
  }

  async create(knight: IKnight): Promise<IKnight> {
    const knightExists = await this.knightRepository.findByNickName(knight.nickname);
    if (knightExists) {
      throw new Conflict('There is already a Knight with this nickname');
    }
    
    knight.keyAttribute = knight.keyAttribute.toLowerCase();
    knight.keyAttributeMod = knight.attributes[knight.keyAttribute];
    return await this.knightRepository.create(knight);
  }

  async findById(id: string): Promise<IKnight> {
    const knight = await this.knightRepository.findById(id);

    if (!knight) throw new NotFound('Knight not found');

    return knight;
  }

  async softDelete(id: string): Promise<void> {
    const knight = await this.knightRepository.findById(id);

    if (!knight) throw new NotFound('Knight not found');

    await this.knightRepository.softDelete(id);
    return;
  }

  async updateNickName(id: string, nickname: string): Promise<void> {
    const knight = await this.knightRepository.findById(id);

    if (!knight) throw new NotFound('Knight not found');

    if (await this.knightRepository.findByNickName(nickname)){
      throw new Conflict('Nickname already in use');
    }

    await this.knightRepository.updateNickName(id, nickname);
    return;
  }

  async findFormatedKnights(hero: boolean): Promise<FormatedKnight[]> {
    return await this.knightRepository.findFormattedKnights(hero);
  }
}

export default KnightService;