import router from '@api/routes';

import express from 'express';
import * as http from 'http';
import { injectable } from 'inversify';
import bodyParser from 'body-parser';
import cors from 'cors';

@injectable()
class App {
  private express: express.Application;
  public server: http.Server;

  constructor() {
    this.express = express();
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(cors());
    this.express.use(router);

    this.server = http.createServer(this.express);
  }
}

export default App;
