import { HttpException, HttpStatus } from '@nestjs/common';
import { MimeExtEnum } from '@trailpath/api/app/common/enum/mime-ext.enum';
import { UploadedFileInterface } from '@trailpath/api/app/common/interface/uploaded-file.interface';
import { FastifyRequest } from 'fastify';
import { FileFilterCallback } from 'multer';
import { extname } from 'path';

export const multerOptions = (extNames: MimeExtEnum[]) => {
  // noinspection JSUnusedGlobalSymbols
  return {
    limits: {
      // Limit size to 10M
      fileSize: 1048576 * 10,
    },
    fileFilter: (
      req: FastifyRequest,
      file: UploadedFileInterface,
      cb: FileFilterCallback,
    ) => {
      if (
        extNames
          .map((extName) => extName.toString().toLowerCase())
          .includes(extname(file.originalname.toLowerCase()))
      ) {
        cb(null, true);
      } else {
        cb(
          new HttpException(
            {
              statusCode: HttpStatus.BAD_REQUEST,
              message: `Unsupported file type ${extname(
                file.originalname.toLowerCase(),
              )}`,
            },
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
  };
};
