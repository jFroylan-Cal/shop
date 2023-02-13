import { Controller } from '@nestjs/common';
import { FilesService } from './files.service';
import { Post } from '@nestjs/common/decorators';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  UploadFile(file: Express.Multer.File) {
    return file;
  }
}
