import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConectionService } from './mongo-conection.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          uri: process.env.DB_URI,
          dbName: process.env.DB_NAME,
        };
      },
    }),
  ],
  providers: [MongoConectionService],
  exports: [MongoConectionService],
})
export class databaseModule {}
