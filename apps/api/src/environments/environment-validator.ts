import { getEnvConfig } from '@trailpath/api/environments/environment-config';
import { EnvironmentInterface, environmentSchema } from '@trailpath/api/environments/interface/environment.interface';
import { SafeParseError } from 'zod';

export function envValidation(env: Partial<EnvironmentInterface>): EnvironmentInterface {
  const config = getEnvConfig(env);

  const parseResult = environmentSchema.safeParse(config);

  if (!parseResult.success) {
    const { error } = parseResult as SafeParseError<unknown>;
    const message = error.errors.map((error) => `${error.path.join('.')}: ${error.message}`).join(', ');

    throw new Error(`Configuration validation failed: ${message}`);
  }

  return parseResult.data;
}
