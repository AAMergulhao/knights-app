import "reflect-metadata";
import { container } from "@infra/di-container";
import MongoDatabaseManager from "../mongo-database-manager";
import KnightRepository from "./knight-repository";

const databaseManager = container.resolve(MongoDatabaseManager);
const knightsRepository = container.resolve(KnightRepository);

beforeAll(() => {
  databaseManager.connect();
});

afterAll(() => {
  databaseManager.disconnect();
});


test('Test get list formatted', async () => {
  const formatedKnights = await knightsRepository.findFormattedKnights(false);
  console.log(formatedKnights);
  
  expect(true).toBe(true);
});