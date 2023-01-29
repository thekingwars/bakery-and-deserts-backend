import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './provider/cloudinary';

import { CloudinaryService } from './service/cloudinary';

@Module({
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider],
})
export class CloudinaryModule {}
