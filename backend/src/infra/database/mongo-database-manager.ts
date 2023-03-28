import { injectable } from "inversify";
import mongoose, { Mongoose } from "mongoose";

@injectable()
class MongoDatabaseManager {
  private connection: Mongoose;

  async connect(): Promise<void> {
    this.connection = await mongoose.connect(process.env.MONGO_URI, {});
    console.log('Database connection stablished');

    return;
  }

  async disconnect(): Promise<void> {
    if (!this.connection) {
      console.log('No open connection found');
      return;
    }
    this.connection.disconnect();
    console.log('Database connection closed');
    return;
  }

  getConnection(): Mongoose {
    return this.connection;
  }

}

export default MongoDatabaseManager;