import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog-schema';
import { Model } from 'mongoose';
import CreateBlogDto from './dto/create-blog.dto';
import UpdateBlogDto from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  async search(coverPath: string) {
    return this.blogModel.find({ coverPath }).exec();
  }

  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel({
      ...createBlogDto,
    });
    return createdBlog.save();
  }

  async update(
    id: string,
    updateBlogDto: UpdateBlogDto,
  ): Promise</*UpdateResult*/ any> {
    return this.blogModel.updateOne({ _id: id }, updateBlogDto);
  }

  async findOne(id: string): Promise<Blog> {
    return this.blogModel.findOne({ _id: id }).exec();
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async delete(id: string): Promise</*DeleteResult*/ any> {
    return this.blogModel.deleteOne({ _id: id });
  }
}
