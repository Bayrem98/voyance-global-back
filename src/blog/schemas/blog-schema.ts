import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true, type: String })
  coverPath: string;
  @Prop({ required: true, type: String })
  videoPath: string;
  @Prop({ required: true, type: String })
  posterPath: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
