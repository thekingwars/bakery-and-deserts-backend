import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'mongoose';

@Injectable()
export class MongoConectionService {
  private dbConnection: Connection;
  private DB_URI: string = this.configService.get('DB_URI');

  constructor(private configService: ConfigService) {
    this.createConnectionDB();
  }

  async createConnectionDB() {
    this.dbConnection = await createConnection(this.DB_URI, {
      dbName: 'bakery-and-deserts',
    });

    this.dbConnection.once('open', () => {
      console.log('Connected to MongoDB');
    });

    this.dbConnection.once('error', () => {
      console.log('Error connecting to MongoDB');
    });
  }

  getConnection(): Connection {
    return this.dbConnection;
  }
}
