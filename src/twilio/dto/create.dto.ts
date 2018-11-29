import { Min,IsInt } from 'class-validator';
import { CreateCatInput } from '../schema';

export class CreateTwilioDto extends CreateCatInput {

    @Min(1)
    age: number
}