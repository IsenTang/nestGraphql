import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlConfigService } from './graph.service';
import { TwilioModule } from './twilio/module';
import { TwilioService } from './twilio/service';




@Module({
  imports: [
    TwilioModule,
    // mongoose
    MongooseModule.forRoot(process.env.MONGO_URL,{ useNewUrlParser: true }),
    // graphql
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
