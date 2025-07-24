import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common';
import Surreal from 'surrealdb';
import { BaseConfig } from '~/modules/app-config/base-config.service';

@Injectable()
export class SurrealDbService
  extends Surreal
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly baseConfig: BaseConfig) {
    super();
  }

  async onModuleInit() {
    await this.connect(this.baseConfig.databaseUrl, {
      auth: {
        username: this.baseConfig.databaseUser,
        password: this.baseConfig.databasePass,
      },
      namespace: this.baseConfig.databaseNamespace,
      database: this.baseConfig.databaseName,
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
