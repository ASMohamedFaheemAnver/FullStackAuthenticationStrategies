import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubPayload {
  @Field()
  time: Date;
}
