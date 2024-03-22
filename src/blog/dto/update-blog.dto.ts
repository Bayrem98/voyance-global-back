import { IsMongoId, IsOptional } from 'class-validator';

export default class UpdateBlogDto {
  @IsMongoId()
  @IsOptional()
  _id?: string;
  @IsOptional()
  coverPath?: string;
  @IsOptional()
  videoPath?: string;
  @IsOptional()
  posterPath?: string;
}
