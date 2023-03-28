import "reflect-metadata";
import { IKnightRepository } from "@infra/database/repositories/knight-repository-interface";
import KnightService from "./knight-service";
import { mockKnight } from "@tests/mocks/knight";

describe('Knight service test suites', () => {

  test('Should create a knight', async () => {
    const knightRepository = {
      create() { return mockKnight },
      findByNickName() { return null }
    };

    const knightService = new KnightService(knightRepository as unknown as IKnightRepository);

    const knight = await knightService.create(mockKnight);
    expect(knight._id != null).toBe(true);
  });

  test('Should throw a exception with duplicate nickname', async () => {
    const knightRepository = {
      findByNickName() { return mockKnight }
    };

    const knightService = new KnightService(knightRepository as unknown as IKnightRepository);

    await expect(knightService.create(mockKnight)).rejects.toThrow('There is already a Knight with this nickname');
  });

  test('Should find a Knight', async () => {
    const knightRepository = {
      findById() { return mockKnight }
    };

    const knightService = new KnightService(knightRepository as unknown as IKnightRepository);

    const knight = await knightService.findById(mockKnight._id);

    expect(knight._id != null).toBe(true);
  });

  test('Should throw a exception searching for a user that does not exist', async () => {
    const knightRepository = {
      findById() { return null }
    };

    const knightService = new KnightService(knightRepository as unknown as IKnightRepository);

    await expect(knightService.findById(mockKnight._id)).rejects.toThrow('Knight not found');
  });

  test('Should throw a exception updating a user that does not exist', async () => {
    const knightRepository = {
      findById() { return null }
    };

    const knightService = new KnightService(knightRepository as unknown as IKnightRepository);

    await expect(knightService.updateNickName(mockKnight._id, 'new nick')).rejects.toThrow('Knight not found');
  });

  test('Should throw a exception deleting a user that does not exist', async () => {
    const knightRepository = {
      findById() { return null }
    };

    const knightService = new KnightService(knightRepository as unknown as IKnightRepository);

    await expect(knightService.softDelete(mockKnight._id)).rejects.toThrow('Knight not found');
  });
});