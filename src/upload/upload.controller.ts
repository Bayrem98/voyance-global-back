import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('cover')
  @UseInterceptors(FileInterceptor('file'))
  uploadCover(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Post('poster')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './posters',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadPoster(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './videos',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return file;
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
