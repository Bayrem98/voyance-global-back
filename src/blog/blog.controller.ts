import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Blog } from './schemas/blog-schema';
import CreateBlogDto from './dto/create-blog.dto';
import UpdateBlogDto from './dto/update-blog.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly BlogService: BlogService) {}

  @Get()
  findAll(@Query('coverPath') coverPath: string) {
    if (!coverPath) return this.BlogService.findAll();
    return this.BlogService.search(coverPath);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.BlogService.findOne(id);
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.BlogService.create(createBlogDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.BlogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.BlogService.delete(id);
  }
}
