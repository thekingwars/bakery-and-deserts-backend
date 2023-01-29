import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(file?.path, {
      folder: folder,
      unique_filename: true,
    });
  }

  deleteUploadImage(publicID: string) {
    return v2.uploader.destroy(publicID);
  }

  async updateImage(public_id: string, url: string, folder: string) {
    await this.deleteUploadImage(public_id);

    return v2.uploader.upload(url, {
      public_id,
      folder,
    });
  }
}
