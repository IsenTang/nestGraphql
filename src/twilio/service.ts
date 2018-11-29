import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './schema';

import { TwimlResponse as Twiml } from 'twilio'


@Injectable()
export class TwilioService {

  /* Constructor */
  constructor(@InjectModel('customers') private readonly customerModel) {}

   /* Send vcode */
   async vcode(phone: string | number): Promise<String> {

    /* Get Twiml from twilio */
    const dialogue = new Twiml();

    /**
     * Find the customer by phone number
     */
    const customer = await this.customerModel.findOne({phone:phone}).lean().exec();

   
    /**
     * Check if customer has auth code generated
     */
    if (customer.auth) {

      /* Prepare the verification code for Twilio */
      const digits = customer.auth.vcode.split('').join('. ');

      /* Say the verification code to customer */
      dialogue.say('Hello, this is Righspo.');
      dialogue.say(`Your verification code is ${digits}.`, { loop: 3 });

    } else {

      /* No auth code.. refuse the request */
      dialogue.say('Sorry, there is no verification code for your number.');

    }

    /* hang up after message has been played */
    dialogue.hangup();

    return dialogue.toString();
    
  }


  private readonly cats: Cat[] = [{ id: 1, name: 'Cat', age: 5 }]


    create(cat: Cat): Cat {

      this.cats.push(cat);
  
      return cat;
    }
  
    findAll(): Cat[] {
      return this.cats;
    }

   
  
    async findOneById(id: number):Promise <Cat> {

      try {
        // const newTest = new this.catModel({context:{a:'test'}});

        // await newTest.save();

        return this.cats.find(cat => cat.id === id);
      } catch (error) {
        console.log('error',error);
      }
      
   
    }
}
