import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private cloudinary: CloudinaryService) {}

  @Post('cover')
  @UseInterceptors(FileInterceptor('file'))
  async onlinecover(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinary
      .uploadImage(file)
      .then((data) => {
        return {
          statusCode: 200,
          filename: data.secure_url,
        };
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }

  @Post('poster')
  @UseInterceptors(FileInterceptor('file'))
  async onlineposter(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinary
      .uploadImage(file)
      .then((data) => {
        return {
          statusCode: 200,
          filename: data.secure_url,
        };
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  async onlinevideo(@UploadedFile() file: Express.Multer.File) {
    return await this.cloudinary
      .uploadImage(file)
      .then((data) => {
        return {
          statusCode: 200,
          filename: data.secure_url,
        };
      })
      .catch((err) => {
        return {
          statusCode: 400,
          message: err.message,
        };
      });
  }

  @Get('cover/:fileId')
  async serveCover(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'covers' });
  }

  @Get('poster/:fileId')
  async servePoster(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'posters' });
  }

  @Get('video/:fileId')
  async serveVideo(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'videos' });
  }
}
