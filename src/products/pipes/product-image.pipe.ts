import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ProductImagePipe implements PipeTransform {
  transform(value: Express.Multer.File): Express.Multer.File | HttpException {
    const maxSize = 2000000;

    if (!value) {
      return;
    }

    if (value.size > maxSize) {
      throw new HttpException(
        'El peso de la imagen no debe ser mayor a 2mb',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!!value.mimetype) {
      const imageType: string = value.mimetype.split('/')[1];

      if (imageType !== 'png' && imageType !== 'jpg' && imageType !== 'jpeg') {
        throw new HttpException(
          'La imagen debe ser de tipo png o jpg, otros formatos seran rechazados',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
    }

    return value;
  }
}
