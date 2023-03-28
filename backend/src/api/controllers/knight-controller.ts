import { Request, Response } from "express";
import { injectable } from "inversify";
import KnightService from "@services/knight-service";
import MongoDatabaseManager from "@infra/database/mongo-database-manager";

@injectable()
class KnightController {
  constructor(private databaseManager: MongoDatabaseManager, private knightService: KnightService) { }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.databaseManager.connect();
      const knight = await this.knightService.create(req.body);

      return res.json({
        message: 'Knight successfully created',
        knight
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    } finally {
      await this.databaseManager.disconnect();
    }
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.databaseManager.connect();
      const { id } = req.params;

      await this.knightService.softDelete(id);

      return res.json({
        message: 'Knight arrived at the hall of heroes'
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    } finally {
      await this.databaseManager.disconnect();
    }
  };

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.databaseManager.connect();
      const { id } = req.params;
      const { nickname } = req.body;

      await this.knightService.updateNickName(id, nickname);

      return res.json({
        message: 'Knight successfully updated'
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    } finally {
      await this.databaseManager.disconnect();
    }
  };

  list = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.databaseManager.connect();

      const { filter } = req.query;
      const knights = await this.knightService.findFormatedKnights(filter === 'heroes');

      return res.json({
        message: 'Success',
        knights
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    } finally {
      await this.databaseManager.disconnect();
    }
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    try {
      await this.databaseManager.connect();

      const { id } = req.params;
      const knight = await this.knightService.findById(id);

      return res.json({
        message: 'Success',
        knight
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    } finally {
      await this.databaseManager.disconnect();
    }
  };

}

export default KnightController;