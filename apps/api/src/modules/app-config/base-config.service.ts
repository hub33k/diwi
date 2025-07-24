import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
import { NodeEnvironment } from '~/shared';

const BaseEnvVariablesSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnvironment),
  LOG_LEVEL: z.string().optional(),

  API_PORT: z.number(),
  API_ALLOWED_ORIGINS: z.string(),
  API_URL: z.string(),

  DATABASE_URL: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASS: z.string(),
  DATABASE_NAMESPACE: z.string(),
  DATABASE_NAME: z.string(),

  JWT_SECRET_KEY: z.string(),
  JWT_REFRESH_SECRET_KEY: z.string(),
});
type BaseEnvVariables = z.infer<typeof BaseEnvVariablesSchema>;

@Injectable()
export class BaseConfig {
  readonly version!: string;

  readonly nodeEnv: string;
  readonly logLevel: string;

  readonly port: number;
  readonly corsOptions: CorsOptions;
  readonly apiUrl: string;

  readonly databaseUrl: string;
  readonly databaseUser: string;
  readonly databasePass: string;
  readonly databaseNamespace: string;
  readonly databaseName: string;

  readonly jwtSecretKey: string;
  readonly jwtRefreshSecretKey: string;

  constructor(configService: ConfigService<BaseEnvVariables>) {
    const config = BaseEnvVariablesSchema.parse({
      NODE_ENV: configService.get<NodeEnvironment>('NODE_ENV'),
      LOG_LEVEL: configService.get<string>('LOG_LEVEL', 'info'),

      API_PORT: Number(configService.get('API_PORT')),
      API_ALLOWED_ORIGINS: configService.get<string>('API_ALLOWED_ORIGINS'),
      API_URL: configService.get<string>('API_URL'),

      DATABASE_URL: configService.get<string>('DATABASE_URL'),
      DATABASE_USER: configService.get<string>('DATABASE_USER'),
      DATABASE_PASS: configService.get<string>('DATABASE_PASS'),
      DATABASE_NAMESPACE: configService.get<string>('DATABASE_NAMESPACE'),
      DATABASE_NAME: configService.get<string>('DATABASE_NAME'),

      JWT_SECRET_KEY: configService.get<string>('JWT_SECRET_KEY'),
      JWT_REFRESH_SECRET_KEY: configService.get<string>(
        'JWT_REFRESH_SECRET_KEY',
      ),
    });

    // biome-ignore lint/style/noNonNullAssertion: off
    this.version = process.env.npm_package_version!;

    this.nodeEnv = config.NODE_ENV;
    this.logLevel = config.LOG_LEVEL || 'info';

    this.port = config.API_PORT;
    this.corsOptions = { origin: config.API_ALLOWED_ORIGINS.split(',') };
    this.apiUrl = config.API_URL;

    this.databaseUrl = config.DATABASE_URL;
    this.databaseUser = config.DATABASE_USER;
    this.databasePass = config.DATABASE_PASS;
    this.databaseNamespace = config.DATABASE_NAMESPACE;
    this.databaseName = config.DATABASE_NAME;

    this.jwtSecretKey = config.JWT_SECRET_KEY;
    this.jwtRefreshSecretKey = config.JWT_REFRESH_SECRET_KEY;
  }
}
