import { ApiBody } from '@nestjs/swagger';

export const ApiBodyFile =
  (fileName = 'file', body): MethodDecorator =>
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
        ...body,
      },
    })(target, propertyKey, descriptor);
  };
