
import { container } from "@infra/di-container";

import { Router } from "express";
import KnightController from "./controllers/knight-controller";

import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../swagger.json';

const router = Router();

const knightController = container.resolve(KnightController);

router.post('/api/knights/', knightController.create);
router.delete('/api/knights/:id', knightController.delete);
router.put('/api/knights/:id', knightController.update);
router.get('/api/knights/', knightController.list);
router.get('/api/knights/:id', knightController.get);

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, { customSiteTitle: "Authentication API Docs" }));

router.get('/api/docs.json', (req, res) => {
  res.json(swaggerFile);
});

export default router;