import { injectable } from "inversify";
import Knight, { FormatedKnight, IKnight } from "../model/Knight";
import { IKnightRepository } from "./knight-repository-interface";

@injectable()
class KnightRepository implements IKnightRepository {

  async create(knight: IKnight): Promise<IKnight> {
    return await Knight.create(knight);
  }

  async findById(id: string): Promise<IKnight> {
    return await Knight.findOne({ _id: id });
  }

  async findByNickName(nickname: string): Promise<IKnight> {
    return await Knight.findOne({ nickname });
  }

  async softDelete(id: string): Promise<void> {
    await Knight.updateOne({ _id: id }, { hero: true });
  }

  async updateNickName(id: string, nickname: string): Promise<void> {
    await Knight.updateOne({ _id: id }, { nickname });
  }

  async findFormattedKnights(hero: boolean): Promise<FormatedKnight[]> {

    const hallOfHeroesMatchStage = { $match: { hero } };

    const ageCalculationStage = {
      $addFields: {
        age: {
          $floor: {
            $divide: [
              { $subtract: [new Date(), "$birthday"] },
              31536000000
            ]
          }
        }
      }
    };

    const weaponsCountStage = {
      $addFields: {
        weapons: {
          $size: "$weapons"
        }
      }
    };

    const expCalculationStage = {
      $addFields: {
        exp: {
          $max: [
            0,
            {
              $floor: {
                $multiply: [
                  { $subtract: ["$age", 7] },
                  { $pow: [22, 1.45] }
                ]
              }
            }
          ]

        }
      }
    };

    const attackCalculationStage = {
      $addFields: {
        attack: {
          $sum: [
            10,
            {
              $switch: {
                branches: [
                  { case: { $in: [{ $getField: "keyAttributeMod" }, [0]] }, then: { $sum: [{ $getField: "keyAttributeMod" }, -2] } },
                  { case: { $in: [{ $getField: "keyAttributeMod" }, [9, 10]] }, then: { $sum: [{ $getField: "keyAttributeMod" }, -1] } },
                  { case: { $in: [{ $getField: "keyAttributeMod" }, [11, 12]] }, then: { $sum: [{ $getField: "keyAttributeMod" }, 0] } },
                  { case: { $in: [{ $getField: "keyAttributeMod" }, [13, 14, 15]] }, then: { $sum: [{ $getField: "keyAttributeMod" }, 1] } },
                  { case: { $in: [{ $getField: "keyAttributeMod" }, [16, 17, 18]] }, then: { $sum: [{ $getField: "keyAttributeMod" }, 2] } },
                  { case: { $gte: [{ $getField: "keyAttributeMod" }, 18] }, then: { $sum: [{ $getField: "keyAttributeMod" }, 3] } }
                ]
              }
            },
            {
              $arrayElemAt: [
                {
                  $map: {
                    input: {
                      $filter: {
                        input: "$weapons",
                        as: "weapon",
                        cond: { $eq: ["$$weapon.equipped", true] }
                      }
                    },
                    in: "$$this.mod"
                  }
                },
                0
              ]
            }
          ]
        }
      }
    };

    const projectionStage = {
      $project: {
        _id: 1,
        name: 1,
        nickname: 1,
        age: 1,
        weapons: 1,
        exp: 1,
        attack: 1
      }
    };

    const pipeline = [
      hallOfHeroesMatchStage,
      ageCalculationStage,
      expCalculationStage,
      attackCalculationStage,
      weaponsCountStage,
      projectionStage
    ];

    const formatedKnights = await Knight.aggregate(pipeline, { maxTimeMS: 60000 });
    return formatedKnights;
  }
}

export default KnightRepository;