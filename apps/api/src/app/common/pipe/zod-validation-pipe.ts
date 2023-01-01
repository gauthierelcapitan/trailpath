import { ZodDtoStatic } from '@anatine/zod-nestjs';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SafeParseError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  public transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;

    if (zodSchema) {
      const parseResult = zodSchema.safeParse(value);

      if (!parseResult.success) {
        const { error } = parseResult as SafeParseError<unknown>;
        const message = error.errors
          .map((error) => `${error.path.join('.')}: ${error.message}`)
          .join(', ');

        throw new BadRequestException(`Input validation failed: ${message}`);
      }

      return parseResult.data;
    }

    return value;
  }
}
