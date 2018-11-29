import { ParseIntPipe, UseGuards,UsePipes } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Cat } from './schema';
import { TwilioService } from './service';
import { CreateTwilioDto } from './dto/create.dto';




@Resolver()
export class TwilioResolvers {
  constructor(private readonly twilioService: TwilioService) {}

  
  @Query('vcode')
  async sendVcode(@Args('phone') phone: string) {
  
   
    return await this.twilioService.vcode(phone);
  }


  /* ========================================================================= */
  @Query('cat')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Cat> {
    return await this.twilioService.findOneById(id);
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateTwilioDto): Promise<Cat> {

    const createdCat = await this.twilioService.create(args);
    
    return createdCat;
    
  }



 


}