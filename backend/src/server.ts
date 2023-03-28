import "reflect-metadata";
import colors from 'colors';
import { container } from 'infra/di-container';
import App from './App';

try {
  const app = container.resolve(App);
  app.server.listen(process.env.PORT, () => {
    console.log(colors.green(`Server listening on port ${process.env.PORT}`));
  });
} catch (error) {
  console.log(colors.red(error.message));
}
