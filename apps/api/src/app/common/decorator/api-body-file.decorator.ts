import { ApiBody } from '@nestjs/swagger';

export const ApiBodyFile =
  (fileName = 'file'): MethodDecorator =>
  (
    target: Record<string, unknown>,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
