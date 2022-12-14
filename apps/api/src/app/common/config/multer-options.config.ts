import { HttpException, HttpStatus } from '@nestjs/common';
import { MimeExtEnum } from '@trailpath/api/app/common/enum/mime-ext.enum';
import { extname } from 'path';

export const multerOptions = (extNames: MimeExtEnum[]) => {
  return {
    limits: {
      // Limit size to 10M
      fileSize: 1048576 * 10,
    },
    fileFilter: (req: any, file: any, cb: any) => {
      if (
        file === null ||
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
