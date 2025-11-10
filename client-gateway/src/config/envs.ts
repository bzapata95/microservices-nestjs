import 'dotenv/config';
import * as z from 'zod';

const Environments = z.object({
  ENVIRONMENT: z.union([z.literal('development'), z.literal('production')]),
  PORT: z.coerce.number().min(1000),
  PRODUCTS_MICROSERVICE_HOST: z.string(),
  PRODUCTS_MICROSERVICE_PORT: z.coerce.number().min(1000),
});

const { error, data } = Environments.safeParse(process.env);

if (error) {
  throw new Error(`Config validation error: ${error}`);
}

type EnvironmentsType = z.infer<typeof Environments>;
const envs: EnvironmentsType = data;

export { envs };
