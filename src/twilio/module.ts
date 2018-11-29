import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TwilioResolvers } from './resolvers';
import { TwilioService } from './service';
import { CustomerSchema } from './schemas/customer.schema';

@Module({
    imports:[
        MongooseModule.forFeature([{name:'customers',schema:CustomerSchema}])
    ],
    providers: [TwilioService, TwilioResolvers]
})
export class TwilioModule {}
