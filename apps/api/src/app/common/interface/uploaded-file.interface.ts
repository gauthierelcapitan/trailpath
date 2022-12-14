export interface UploadedFileInterface {
  buffer: Buffer;
  encoding: string;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}
